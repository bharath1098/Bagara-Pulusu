import type { Metadata, Viewport } from "next";
import { Literata, DM_Sans, Great_Vibes, Outfit } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { cafeJsonLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import "./bp-public.css";
import "./color-theme.css";

const display = Literata({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const heroSans = Outfit({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const description =
  "Bagara & Pulusu in Jubilee Hills, Hyderabad. Andhra rice, fries, pulusu and thalis, open daily 11:00 AM–11:30 PM. Reserve a table or scan the QR to order.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Bagara & Pulusu | Andhra Dining in Jubilee Hills",
    template: "%s · Bagara & Pulusu",
  },
  description,
  icons: {
    icon: "/media/cafe/logo.png",
    apple: "/media/cafe/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Bagara & Pulusu",
    images: [{ url: "/media/cafe/logo.png", alt: "Bagara & Pulusu" }],
  },
  twitter: {
    card: "summary",
    images: ["/media/cafe/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement,p=location.pathname;" +
              "var ops=/^\\/(staff|order|t)(\\/|$)/.test(p);" +
              "var th='dark';" +
              "try{var s=localStorage.getItem('bagara-theme');" +
              "if(s==='light'||s==='dark'||s==='auto')th=s}catch(e){}" +
              "if(ops)d.dataset.theme='dark';" +
              "else if(th==='auto')d.dataset.theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';" +
              "else d.dataset.theme=th;" +
              "var B=1920,M=1280;" +
              "function z(){var w=window.innerWidth,k=w>=M?Math.min(w/B,2.5):1;" +
              "d.style.setProperty('--ui-zoom',k.toFixed(4))}" +
              "z();window.addEventListener('resize',z);" +
              "if(ops){d.dataset.intro='skip';return}" +
              "if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='done';return}" +
              "try{if(sessionStorage.getItem('bagara-intro-seen')){d.dataset.intro='done';return}}catch(e){}" +
              "d.dataset.intro='open';d.dataset.introStart=String(Date.now())})()",
          }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} ${script.variable} ${heroSans.variable} antialiased`}>
        <JsonLd data={cafeJsonLd()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
