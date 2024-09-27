import { render } from "@react-email/render";
import WelcomeTemplate from "../../../emails";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { Client } from "@notionhq/client";

const resend = new Resend(process.env.RESEND_API_KEY);
const notion = new Client({ auth: process.env.NOTION_SECRET });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 m"),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const result = await ratelimit.limit(ip);

  if (!result.success) {
    return NextResponse.json(
      { error: "Too many requests!" },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { email, name, industry, familiarityWithGenAI, intendedUseOfGenAI, concernLevelAboutAIRisk } = body;

  try {
    // Send email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Learn Safe AI <tu@learnsafe.ai>",
      to: [email],
      subject: "Learn Safe AI - Waitlist confirmed",
      reply_to: "tu@learnsafe.ai",
      html: render(WelcomeTemplate({ userFirstname: name.split(' ')[0] })),
    });

    if (emailError) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // If email sent successfully, update Notion
    // Process industry
    let industry = body.industry;
    if (industry === "Other" && body.industryOther) {
      industry = body.industryOther;
    }

    // Process intended use of GenAI
    let intendedUse = body.intendedUseOfGenAI.map((use: string) =>
      use === "Other" ? body.intendedUseOther : use
    ).filter(Boolean).join("; ");

    const response = await notion.pages.create({
      parent: {
        database_id: `${process.env.NOTION_DB}`,
      },
      properties: {
        "Name": {
          title: [
            {
              text: {
                content: body.name,
              },
            },
          ],
        },
        "Email": {
          email: body.email,
        },
        "Industry": {
          rich_text: [
            {
              text: {
                content: industry,
              },
            },
          ],
        },
        "Familiarity with GenAI": {
          select: {
            name: body.familiarityWithGenAI,
          },
        },
        "Intended Use of GenAI": {
          rich_text: [
            {
              text: {
                content: intendedUse,
              },
            },
          ],
        },
        "Concern Level About AI Risk": {
          select: {
            name: body.concernLevelAboutAIRisk,
          },
        },
      },
    });

    if (!response) {
      throw new Error("Failed to add data to Notion");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in join-waitlist:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}