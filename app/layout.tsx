import type { Metadata } from "next";
import { Sora, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteFormEnhancer from "@/components/QuoteFormEnhancer";
import { siteConfig } from "@/lib/nav";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-sora", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: { default: `${siteConfig.brand} | ${siteConfig.descriptor}`, template: `%s` },
  description: siteConfig.tagline,
  openGraph: { type: "website", images: ["/images/hero-og.jpg"] },
  twitter: { card: "summary_large_image" },
  verification: { google: "Ucqn6gg7B7vT58yUeMx2_h4wJG8vHKw7MyIYcoAGvlU" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${sora.variable} ${hanken.variable}`}>
      <body className="bg-background text-on-background font-body-md selection:bg-primary/20">
        <Header />
        <main>{children}</main>
        <Footer />
        <QuoteFormEnhancer />
        <Script id="ga-src" src="https://www.googletagmanager.com/gtag/js?id=G-HYE7M1QSN6" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HYE7M1QSN6');`}
        </Script>
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xbk8mvpvfg");`}
        </Script>
      </body>
    </html>
  );
}
