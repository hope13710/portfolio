"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      onClick={() => openLightbox(picture, lang)}
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

/**
 * Pictures the viewer flips through in one frame: arrow buttons, dots, or a horizontal swipe.
 * A tap without a swipe still enlarges the current picture. A single picture renders as a plain Frame.
 */
export function FrameSlider({ pictures, ...frameProps }: FrameProps & { pictures: Picture | Picture[] }) {
  const lang = useHtmlAttr("lang", "ko") as "ko" | "en";
  const list = Array.isArray(pictures) ? pictures : [pictures];
  const [shown, setShown] = useState(0);
  const swipe = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  if (list.length === 1) return <Frame picture={list[0]} {...frameProps} />;

  const go = (delta: number) => setShown((i) => (i + delta + list.length) % list.length);
  const labels =
    lang === "ko"
      ? { prev: "이전 사진", next: "다음 사진", nth: (n: number) => `${n}번째 사진 보기` }
      : { prev: "Previous photo", next: "Next photo", nth: (n: number) => `Show photo ${n}` };

  return (
    <div
      className="frame-slider"
      role="group"
      aria-roledescription={lang === "ko" ? "사진 넘기기" : "carousel"}
      onPointerDown={(e) => {
        swipe.current = { x: e.clientX, y: e.clientY, moved: false };
      }}
      // Stop the browser's own image drag so a mouse drag flips pictures too.
      onDragStart={(e) => e.preventDefault()}
      onPointerMove={(e) => {
        const s = swipe.current;
        if (s && Math.abs(e.clientX - s.x) > 10 && Math.abs(e.clientX - s.x) > Math.abs(e.clientY - s.y)) s.moved = true;
      }}
      onPointerUp={(e) => {
        const s = swipe.current;
        if (s?.moved && Math.abs(e.clientX - s.x) > 40) go(e.clientX < s.x ? 1 : -1);
      }}
      // A swipe ends with a click on the picture; swallow it so it doesn't open the enlarged view.
      onClickCapture={(e) => {
        if (swipe.current?.moved) {
          e.stopPropagation();
          e.preventDefault();
        }
        swipe.current = null;
      }}
    >
      <div className="frame-cycle">
        {list.map((picture, i) => (
          <div key={i} className="frame-cycle-item" data-shown={i === shown} inert={i !== shown}>
            <Frame picture={picture} {...frameProps} />
          </div>
        ))}
      </div>
      <button type="button" className="slider-arrow slider-prev" aria-label={labels.prev} onClick={() => go(-1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button type="button" className="slider-arrow slider-next" aria-label={labels.next} onClick={() => go(1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="slider-dots">
        {list.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={labels.nth(i + 1)}
            aria-current={i === shown ? "true" : undefined}
            onClick={() => setShown(i)}
          />
        ))}
      </div>
    </div>
  );
}
