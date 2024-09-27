import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_SECRET });

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  try {
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