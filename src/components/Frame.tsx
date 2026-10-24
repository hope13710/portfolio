"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { Picture } from "@/content";
import { useHtmlAttr } from "@/lib/html-attr";

/** One image in the shared frame style. `variant` sets the aspect ratio: wide 16:10 or tall 4:5. */
export function Frame({
  picture,
  variant,
  sizes,
  priority,
}: {
  picture: Picture;
  variant: "wide" | "tall";
  sizes: string;
  priority?: boolean;
}) {
  const lang = useHtmlAttr("lang", "ko") as "ko" | "en";
  return (
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
}

/** Pictures that take turns in one frame, crossfading every few seconds. A single picture renders as a plain Frame. */
export function FrameCycle({
  pictures,
  variant,
  sizes,
}: {
  pictures: Picture | Picture[];
  variant: "wide" | "tall";
  sizes: string;
}) {
  const list = Array.isArray(pictures) ? pictures : [pictures];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (list.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setShown((i) => (i + 1) % list.length), 3500);
    return () => window.clearInterval(timer);
  }, [list.length]);

  if (list.length === 1) return <Frame picture={list[0]} variant={variant} sizes={sizes} />;

  return (
    <div className="frame-cycle">
      {list.map((picture, i) => (
        <div key={i} className="frame-cycle-item" data-shown={i === shown} aria-hidden={i !== shown}>
          <Frame picture={picture} variant={variant} sizes={sizes} />
        </div>
      ))}
    </div>
  );
}
