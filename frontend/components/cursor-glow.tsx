"use client";

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReduced) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.setProperty("--mx", `${x}%`);
      document.body.style.setProperty("--my", `${y}%`);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return null;
}

