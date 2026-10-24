import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "강주영 Kang Ju Yeong · Ethan",
  description:
    "사람들을 즐겁게 하는 제품을 만드는 사람, 강주영의 포트폴리오. Portfolio of Kang Ju Yeong (Ethan) — building products that make people happy.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
};

// Runs before first paint: restores the saved language/theme (or follows the browser)
// and turns on reveal animations only when JS is available.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var l=localStorage.getItem('lang');var t=localStorage.getItem('theme');}catch(e){}if(l!=='ko'&&l!=='en'){l=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.dataset.lang=l;d.lang=l;d.dataset.theme=t;})();`;

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
