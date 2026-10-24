"use client";

import { useEffect, useRef, useState } from "react";

import type { Picture } from "@/content";

const OPEN_EVENT = "lightbox:open";

type Shown = { src: string; width: number; height: number; alt: string };

/** Opens the shared lightbox with a picture at full size. */
export function openLightbox(picture: Picture, lang: "ko" | "en") {
  const detail: Shown = {
    src: picture.src.src,
    width: picture.src.width,
    height: picture.src.height,
    alt: picture.alt[lang],
  };
  window.dispatchEvent(new CustomEvent<Shown>(OPEN_EVENT, { detail }));
}

/** One page-wide <dialog> for enlarged images; Esc, the close button or a click outside the image closes it. */
export function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState<Shown | null>(null);

  useEffect(() => {
    const onOpen = (event: Event) => {
      setShown((event as CustomEvent<Shown>).detail);
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={shown?.alt}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
      onClose={() => setShown(null)}
    >
      {shown && (
        <figure onClick={() => dialog.current?.close()}>
          {/* eslint-disable-next-line @next/next/no-img-element -- already a static, sized asset */}
          <img src={shown.src} width={shown.width} height={shown.height} alt={shown.alt} />
          <figcaption>{shown.alt}</figcaption>
        </figure>
      )}
      <button type="button" className="lightbox-close" aria-label="Close" onClick={() => dialog.current?.close()}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  );
}
