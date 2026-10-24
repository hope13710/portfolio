"use client";

import { openGallery } from "@/components/Lightbox";
import type { Picture } from "@/content";
import { useHtmlAttr } from "@/lib/html-attr";

/** Chip in a stage's link row that opens its on-site photos as a gallery. */
export function GalleryButton({ pictures }: { pictures: Picture[] }) {
  const lang = useHtmlAttr("lang", "ko") as "ko" | "en";
  const label = lang === "ko" ? "현장 사진" : "Photos";
  return (
    <button type="button" className="link gallery-btn" onClick={() => openGallery(pictures, label, lang)}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
      {label} {pictures.length}
    </button>
  );
}
