import Image from "next/image";

import { T } from "@/components/T";
import type { Stage } from "@/content";

/** A stage's logo row. `placement` decides where it shows: under the images on desktop, at the end of the stage on phones. */
export function Sponsors({ sponsors, placement }: { sponsors: NonNullable<Stage["sponsors"]>; placement: "media" | "end" }) {
  return (
    <div className={`sponsors sponsors-${placement}`}>
      <p className="sponsors-label">
        <T t={sponsors.label} />
      </p>
      <ul>
        {sponsors.logos.map((logo) => (
          <li key={logo.name}>
            <Image src={logo.src} alt={logo.name} style={{ "--s": logo.scale ?? 1 } as React.CSSProperties} />
          </li>
        ))}
      </ul>
    </div>
  );
}
