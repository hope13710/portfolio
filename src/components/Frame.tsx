"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { openLightbox } from "@/components/Lightbox";
import type { Picture } from "@/content";
import { useHtmlAttr } from "@/lib/html-attr";

type FrameProps = {
  variant: "wide" | "tall";
  sizes: string;
  priority?: boolean;
  /** Click (or Enter) to see the picture enlarged. */
  zoomable?: boolean;
};

/** One image in the shared frame style. `variant` sets the aspect ratio: wide 16:10 or tall 4:5. */
export function Frame({ picture, variant, sizes, priority, zoomable }: FrameProps & { picture: Picture }) {
  const lang = useHtmlAttr("lang", "ko") as "ko" | "en";
  const frame = (
    <div className={`frame frame-${variant}`}>
      <Image
        src={picture.src}
        alt={picture.alt[lang]}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        style={{ objectFit: "cover", objectPosition: picture.position ?? "50% 50%" }}
      />
    </div>
  );
  if (!zoomable) return frame;

  return (
    <button
      type="button"
      className="frame-zoom"
      aria-label={lang === "ko" ? `${picture.alt.ko} 크게 보기` : `Enlarge: ${picture.alt.en}`}
      onClick={() => openLightbox([picture], 0, lang)}
    >
      {frame}
    </button>
  );
}

/** Pictures that take turns in one frame, crossfading every few seconds. A single picture renders as a plain Frame. */
export function FrameCycle({ pictures, ...frameProps }: FrameProps & { pictures: Picture | Picture[] }) {
  const list = Array.isArray(pictures) ? pictures : [pictures];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (list.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setShown((i) => (i + 1) % list.length), 3500);
    return () => window.clearInterval(timer);
  }, [list.length]);

  if (list.length === 1) return <Frame picture={list[0]} {...frameProps} />;

  return (
    <div className="frame-cycle">
      {list.map((picture, i) => (
        <div key={i} className="frame-cycle-item" data-shown={i === shown} inert={i !== shown}>
          <Frame picture={picture} {...frameProps} />
        </div>
      ))}
    </div>
  );
}
