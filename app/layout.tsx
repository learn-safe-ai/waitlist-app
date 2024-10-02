import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { CSPostHogProvider } from "./providers";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn Safe AI",
  description:
    "Master safe and strategic AI use, no tech background required",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta property="og:image" content="/opengraph-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="832" />
      <meta
        property="og:site_name"
        content="Learn Safe AI"
      />
      <meta
        property="og:url"
        content="https://learnsafe.ai/"
      />
      <meta name="twitter:image" content="/opengraph-image.png" />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="832" />
      <CSPostHogProvider>
        <body className={FigtreeFont.className}>
          {children}
          <Toaster richColors position="top-center" />
          <Analytics />
          <GoogleAnalytics gaId="G-E2FSXSY97Z" />
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
          >
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
              n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1112173830487266');
            fbq('track', 'PageView');
            `}
          </Script>
          <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1112173830487266&ev=PageView&noscript=1"
          /></noscript>

        </body>
      </CSPostHogProvider>
    </html>
  );
}
