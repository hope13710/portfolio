"use client";

import Image from "next/image";

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
