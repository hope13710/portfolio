"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/** Right-edge stage indicator. Also marks each section `data-active` once it is reached, which triggers its reveal. */
export function StageNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // A section is "current" while it crosses the middle of the viewport,
    // which also works for sections taller than the screen on phones.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-active", "");
          setActive(sections.indexOf(entry.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useOneStagePerGesture(items);

  return (
    <nav className="stage-nav" aria-label="Stages">
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={i === active ? "step" : undefined}>
              <span className="stage-nav-label">
                {String(i).padStart(2, "0")} {item.label}
              </span>
              <span className="stage-nav-dot" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * CSS scroll snapping lets a hard mouse-wheel or trackpad flick skip past a stage.
 * For wheel input, move exactly one stage per gesture and stop there.
 * Touch and keyboard keep the native snapping, which already stops at each stage.
 */
function useOneStagePerGesture(items: Item[]) {
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let moving = false;
    let lastWheel = 0;

    const finishMove = () => {
      moving = false;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      const dir = Math.sign(event.deltaY);
      if (!dir) return;

      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;

      const y = window.scrollY;
      let current = 0;
      sections.forEach((section, i) => {
        if (section.offsetTop <= y + 2) current = i;
      });
      const section = sections[current];

      // A stage taller than the screen scrolls normally until its edge is reached.
      const bottom = section.offsetTop + section.offsetHeight;
      if (dir > 0 && y + window.innerHeight < bottom - 2) return;
      if (dir < 0 && y > section.offsetTop + 2) return;

      event.preventDefault();
      // Ignore the rest of a gesture (including trackpad inertia) once a move has started.
      if (moving || gap < 150) return;

      const target = sections[current + dir];
      if (!target) return;

      moving = true;
      window.scrollTo({ top: target.offsetTop, behavior: reduceMotion ? "auto" : "smooth" });
      window.addEventListener("scrollend", finishMove, { once: true });
      window.setTimeout(finishMove, 1000);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [items]);
}
