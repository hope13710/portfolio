import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

// Link previews (KakaoTalk, Slack, LinkedIn …) need absolute URLs. The deploy workflow sets
// NEXT_PUBLIC_SITE_URL for GitHub Pages; Vercel provides its production domain automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/`
    : "http://localhost:3000/");

const title = "강주영 · Product Builder";
const description =
  "아티스트를 위한 인프라를 구축하고자 합니다. 육군창업경진대회 본선 진출 및 수상 · 고래코리안 공동창업 · Enactus 회장.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    url: "./",
    siteName: "Kang Ju Yeong",
    title,
    description,
    locale: "ko_KR",
    alternateLocale: ["en_US"],
    images: [{ url: "og.png", width: 1200, height: 630, alt: "강주영 · Product Builder" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["og.png"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
};

// Runs before first paint: restores the saved language (or follows the browser), turns on reveal
// animations only when JS is available, and makes the theme follow the device's light/dark setting,
// switching live when it changes. The theme toggle only overrides it for the current visit.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');var l;try{l=localStorage.getItem('lang');localStorage.removeItem('theme');}catch(e){}if(l!=='ko'&&l!=='en'){l=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}d.dataset.lang=l;d.lang=l;var m=window.matchMedia('(prefers-color-scheme: dark)');var f=function(){d.dataset.theme=m.matches?'dark':'light';};f();if(m.addEventListener){m.addEventListener('change',f);}else if(m.addListener){m.addListener(f);}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-lang="ko" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
