"use client";

import { useEffect, useRef } from "react";

/** Soft teal glow that follows the pointer on large screens. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const move = (event: PointerEvent) => {
      element.style.background = `radial-gradient(600px at ${event.clientX}px ${event.clientY}px, rgba(45, 212, 191, 0.08), transparent 80%)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden transition duration-300 lg:block" />;
}
