"use client";

import { setHtmlAttr, useHtmlAttr } from "@/lib/html-attr";

export function Controls() {
  const lang = useHtmlAttr("lang", "ko");
  const theme = useHtmlAttr("theme", "light");
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="controls">
      <div className="seg" role="group" aria-label="Language">
        {(["ko", "en"] as const).map((l) => (
          <button key={l} type="button" aria-pressed={lang === l} onClick={() => setHtmlAttr("lang", l)}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="icon-btn"
        aria-label={nextTheme === "dark" ? "Switch to dark mode" : "Switch to light mode"}
        onClick={() => setHtmlAttr("theme", nextTheme)}
      >
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
