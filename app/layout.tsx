import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://reaction-test.org";
const googleAnalyticsId = "G-2HRMEWXZ0G";
const microsoftClarityId = "y0srrpjzkn";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Reaction Time Test - Free Online Reaction Test",
  description: "Take a free reaction time test online. This five-round reaction test measures your average and best reaction time in milliseconds on desktop or mobile.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Reaction Time Test - Free Online Reaction Test",
    description: "Measure your reaction time in five quick rounds and compare your average and best result.",
    url: siteUrl,
    siteName: "Reaction Time",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Reaction Time Test score screen" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Reaction Time Test - Free Online Reaction Test",
    description: "Measure your reaction time in five quick rounds.",
    images: ["/og-image.png"]
  },
  icons: { icon: "/icon.svg" }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${microsoftClarityId}");
          `}
        </Script>
      </body>
    </html>
  );
}
