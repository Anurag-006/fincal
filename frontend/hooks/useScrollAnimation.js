"use client";
import { useEffect, useRef } from "react";

/**
 * FIX: Removed the terrible require("react") inside hook pattern.
 * This hook is now clean and performant.
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}
