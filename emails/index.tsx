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
          src={`https://app-peach-kappa-91.vercel.app/waitlist-email-logo.png`}
          width="216"
          height="65"
          alt="LearnSafeAI Logo"
          style={logo}
        />
        <Text style={greeting}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thanks for joining the waitlist for LearnSafeAI. I'm glad to
          have you on board.
        </Text>
        <Text style={paragraph}>
          We will keep you posted on the progress and notify you as soon as you can start learning safe AI best practices. 
          In the meantime, if you have any questions or
          feedback, don't hesitate to reach out by replying directly to{" "}
          <a href="mailto:tu@learnsafe.ai" style={link}>
            this email {""}
          </a>
          — I'm here to listen!
        </Text>
        <Text style={paragraph}>
          You can also follow us on X/Twitter for updates:{" "}
          <a href="https://x.com/learnsafeai" style={link}>
            @learnsafeai
          </a>
        </Text>
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
  background: "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
  fontFamily: 'figtree, "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px 0",
  color: "#cccccc",
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
