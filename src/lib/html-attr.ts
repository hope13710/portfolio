"use client";

import { useSyncExternalStore } from "react";

// Language and theme live on <html data-lang data-theme>, set before first paint
// by the inline script in layout.tsx. Components that need them in JS read them here.

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-lang", "data-theme"],
  });
  return () => observer.disconnect();
}

export function useHtmlAttr(name: "lang" | "theme", fallback: string) {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset[name] ?? fallback,
    () => fallback,
  );
}

export function setHtmlAttr(name: "lang" | "theme", value: string) {
  const root = document.documentElement;
  root.dataset[name] = value;
  if (name !== "lang") return; // The theme isn't saved: it follows the device setting on every visit.
  root.lang = value;
  try {
    localStorage.setItem(name, value);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies to this visit.
  }
}
