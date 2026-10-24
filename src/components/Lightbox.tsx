"use client";

import { useEffect, useRef, useState } from "react";

import type { Picture } from "@/content";

const OPEN_EVENT = "lightbox:open";

type Shown = { src: string; width: number; height: number; alt: string };
type Opened = {
  items: Shown[];
  /** Picture shown large; null shows the thumbnail grid. */
  index: number | null;
  /** Set for galleries: heading of the grid and the way back to it. */
  gallery?: { title: string; back: string };
};

/** Opens the shared lightbox on one picture, enlarged. */
export function openLightbox(picture: Picture, lang: "ko" | "en") {
  dispatch({ items: [toShown(picture, lang)], index: 0 });
}

/** Opens several pictures as a thumbnail grid; choosing one shows it large. */
export function openGallery(pictures: Picture[], title: string, lang: "ko" | "en") {
  dispatch({
    items: pictures.map((p) => toShown(p, lang)),
    index: null,
    gallery: { title, back: lang === "ko" ? "전체 보기" : "All photos" },
  });
}

function toShown(p: Picture, lang: "ko" | "en"): Shown {
  return { src: p.src.src, width: p.src.width, height: p.src.height, alt: p.alt[lang] };
}

function dispatch(detail: Opened) {
  window.dispatchEvent(new CustomEvent<Opened>(OPEN_EVENT, { detail }));
}

/**
 * One page-wide <dialog> for enlarged images. Esc, the close button or a click outside closes it.
 * In a gallery, an enlarged picture steps with the arrow buttons, ← / → keys or a swipe,
 * and Esc or a click outside returns to the grid first.
 */
export function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [opened, setOpened] = useState<Opened | null>(null);

  const count = opened?.items.length ?? 0;
  const index = opened?.index ?? null;
  const shown = index === null ? undefined : opened?.items[index];
  const inGalleryDetail = Boolean(opened?.gallery) && index !== null;

  const setIndex = (next: number | null) => setOpened((o) => (o ? { ...o, index: next } : o));
  const step = (delta: number) =>
    setOpened((o) => (o && o.index !== null ? { ...o, index: (o.index + delta + o.items.length) % o.items.length } : o));
  // Leaves the enlarged view: back to the grid in a gallery, otherwise closes.
  const dismiss = () => (inGalleryDetail ? setIndex(null) : dialog.current?.close());

  useEffect(() => {
    const onOpen = (event: Event) => {
      setOpened((event as CustomEvent<Opened>).detail);
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Listen on the window: after a thumbnail is chosen it unmounts, so focus may no longer be inside the dialog.
  useEffect(() => {
    if (index === null || count < 2) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count]);

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={shown?.alt ?? opened?.gallery?.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
      onCancel={(event) => {
        if (inGalleryDetail) {
          event.preventDefault();
          setIndex(null);
        }
      }}
      onPointerDown={(event) => {
        swipeStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        const start = swipeStart.current;
        swipeStart.current = null;
        if (start === null || index === null || count < 2) return;
        const dx = event.clientX - start;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
      onClose={() => setOpened(null)}
    >
      {opened?.gallery && index === null && (
        <div
          className="lightbox-gallery"
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <p className="lightbox-title">
            {opened.gallery.title} <span>{count}</span>
          </p>
          <ul className="lightbox-grid">
            {opened.items.map((item, i) => (
              <li key={item.src}>
                <button type="button" className="lightbox-thumb" onClick={() => setIndex(i)}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- already a static, sized asset */}
                  <img src={item.src} width={item.width} height={item.height} alt="" loading="lazy" />
                  <span>{item.alt}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {shown && (
        <figure
          onClick={(event) => {
            // A click on the empty area around the picture (or on a single picture) leaves the view.
            if (event.target === event.currentTarget || !opened?.gallery) dismiss();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- already a static, sized asset */}
          <img key={shown.src} src={shown.src} width={shown.width} height={shown.height} alt={shown.alt} draggable={false} />
          <figcaption>
            {count > 1 && (
              <span className="lightbox-count">
                {index! + 1} / {count}
              </span>
            )}
            {shown.alt}
          </figcaption>
        </figure>
      )}

      {shown && count > 1 && (
        <>
          <button type="button" className="lightbox-nav lightbox-prev" aria-label="Previous photo" onClick={() => step(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="lightbox-nav lightbox-next" aria-label="Next photo" onClick={() => step(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {inGalleryDetail && (
        <button type="button" className="lightbox-back" onClick={() => setIndex(null)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
          </svg>
          {opened!.gallery!.back}
        </button>
      )}

      <button type="button" className="lightbox-close" aria-label="Close" onClick={() => dialog.current?.close()}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  );
}
