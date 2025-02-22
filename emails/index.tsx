import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  userFirstname: string;
}

export const NotionWaitlistEmail = ({ userFirstname }: EmailProps) => (
  <Html>
    <Head />
    <Preview>Thanks for joining the waitlist, {userFirstname}! 🎉</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://learnsafe.ai/learn-safe-ai-email.png`}
          height="65"
          alt="LearnSafeAI Logo"
          style={logo}
        />
        <Text style={greeting}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thanks for joining the waitlist for LearnSafeAI. We're glad to have you on board. We will keep you posted on the progress and notify you as soon as you can start learning safe AI best practices.
        </Text>
        <Text style={paragraph}>
          In the meantime, we will keep you posted on industry updates and advancements in AI.
        </Text>
        <Text style={paragraph}>
          If you have any questions or feedback, don't hesitate to reach out by replying directly to{" "}
          <a href="mailto:tu@learnsafe.ai" style={link}>
            this email {""}
          </a>
          — I'm here to listen!
        </Text>
        {/* <Text style={paragraph}>
          You can also follow us on X/Twitter for updates:{" "}
          <a href="https://x.com/learnsafeai" style={link}>
            @learnsafeai
          </a>
        </Text> */}
        <Text style={signOff}>
          Best regards,
          <br />
          Learn Safe AI
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          You received this email because you signed up for LearnSafeAI.
          If you believe this is a mistake, feel free to ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

NotionWaitlistEmail.PreviewProps = {
  userFirstname: "LearnSafeAI",
} as EmailProps;

export default NotionWaitlistEmail;

const main = {
  background: "linear-gradient(-225deg, #ffab40 0%, #0d5bd9 100%)",
  fontFamily: 'figtree, "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px 0",
  color: "#1c1c1c",
};

const container = {
  margin: "0 auto",
  padding: "24px 32px 48px",
  backgroundColor: "#f9fbfd",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto",
  paddingBottom: "20px",
};

const greeting = {
  fontSize: "18px",
  lineHeight: "28px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "20px",
};

const link = {
  color: "#ffab40",
  textDecoration: "underline",
};

const signOff = {
  fontSize: "16px",
  lineHeight: "26px",
  marginTop: "20px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8c8c8c",
  fontSize: "12px",
};
