"use client";

import { useState, useEffect } from "react";
import { useInView, type IntersectionOptions } from "react-intersection-observer";

/** Só anima quando a seção está visível e a aba do navegador está ativa. */
export function useMotionActive(options?: IntersectionOptions) {
  const [ref, inView] = useInView({
    threshold: 0.12,
    rootMargin: "80px 0px",
    ...options,
  });
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return { ref, active: inView && pageVisible };
}
