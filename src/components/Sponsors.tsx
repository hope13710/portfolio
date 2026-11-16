"use client";

import Image from "next/image";
import { useState } from "react";

import { T } from "@/components/T";
import type { Stage } from "@/content";
import { useHtmlAttr } from "@/lib/html-attr";

/** A stage's logo row. `placement` decides where it shows: under the images on desktop, at the end of the stage on phones. */
export function Sponsors({ sponsors, placement }: { sponsors: NonNullable<Stage["sponsors"]>; placement: "media" | "end" }) {
  const lang = useHtmlAttr("lang", "ko") as "ko" | "en";
  const [expanded, setExpanded] = useState(false);
  const limit = sponsors.visible ?? sponsors.logos.length;
  const hidden = sponsors.logos.slice(limit);
  const shown = expanded ? sponsors.logos : sponsors.logos.slice(0, limit);

  return (
    <div className={`sponsors sponsors-${placement}`}>
      <p className="sponsors-label">
        <T t={sponsors.label} />
      </p>
      <ul>
        {shown.map((logo) => (
          <li key={logo.name}>
            <Image src={logo.src} alt={logo.name} style={{ "--s": logo.scale ?? 1 } as React.CSSProperties} />
          </li>
        ))}
        {hidden.length > 0 && !expanded && (
          <li>
            <button
              type="button"
              className="sponsors-more"
              title={hidden.map((logo) => logo.name.split(" ")[0]).join(", ")}
              aria-label={lang === "ko" ? `기관 ${hidden.length}곳 더 보기` : `Show ${hidden.length} more`}
              onClick={() => setExpanded(true)}
            >
              +{hidden.length}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
