"use client";

import { useEffect, useRef, useState } from "react";

import type { Picture } from "@/content";

const OPEN_EVENT = "lightbox:open";

type Shown = { src: string; width: number; height: number; alt: string };
type Opened = { items: Shown[]; index: number };

/** Opens the shared lightbox on `pictures[index]`; with several pictures it works as a gallery. */
export function openLightbox(pictures: Picture[], index: number, lang: "ko" | "en") {
  const detail: Opened = {
    items: pictures.map((p) => ({ src: p.src.src, width: p.src.width, height: p.src.height, alt: p.alt[lang] })),
    index,
  };
  window.dispatchEvent(new CustomEvent<Opened>(OPEN_EVENT, { detail }));
}

/**
 * One page-wide <dialog> for enlarged images. Esc, the close button or a click outside the image closes it;
 * galleries also step with the arrow buttons, ← / → keys, or a horizontal swipe.
 */
export function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [opened, setOpened] = useState<Opened | null>(null);

  const count = opened?.items.length ?? 0;
  const step = (delta: number) =>
    setOpened((o) => (o ? { ...o, index: (o.index + delta + o.items.length) % o.items.length } : o));

  useEffect(() => {
    const onOpen = (event: Event) => {
      setOpened((event as CustomEvent<Opened>).detail);
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const shown = opened?.items[opened.index];

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={shown?.alt}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
      onKeyDown={(event) => {
        if (count < 2) return;
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
      onPointerDown={(event) => {
        swipeStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        const start = swipeStart.current;
        swipeStart.current = null;
        if (start === null || count < 2) return;
        const dx = event.clientX - start;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
      onClose={() => setOpened(null)}
    >
      {shown && (
        <figure
          onClick={(event) => {
            // A click (not a swipe) on the picture or the empty area around it closes the viewer.
            if (event.target === event.currentTarget || count < 2) dialog.current?.close();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- already a static, sized asset */}
          <img key={shown.src} src={shown.src} width={shown.width} height={shown.height} alt={shown.alt} draggable={false} />
          <figcaption>
            {count > 1 && (
              <span className="lightbox-count">
                {opened!.index + 1} / {count}
              </span>
            )}
            {shown.alt}
          </figcaption>
        </figure>
      )}
      {count > 1 && (
        <>
          <button type="button" className="lightbox-nav lightbox-prev" aria-label="Previous" onClick={() => step(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="lightbox-nav lightbox-next" aria-label="Next" onClick={() => step(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      <button type="button" className="lightbox-close" aria-label="Close" onClick={() => dialog.current?.close()}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  );
}
