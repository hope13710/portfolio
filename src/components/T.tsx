import type { L } from "@/content";

/**
 * Renders both languages; CSS hides the inactive one based on <html data-lang>.
 * This keeps the static HTML correct for either language with no flash on load.
 */
export function T({ t }: { t: L }) {
  return (
    <>
      <span data-l="ko" lang="ko">
        {t.ko}
      </span>
      <span data-l="en" lang="en">
        {t.en}
      </span>
    </>
  );
}
