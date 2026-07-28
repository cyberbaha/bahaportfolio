import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll + ScrollTrigger integration. Lenis drives the scroll, GSAP's
 * ticker drives Lenis, and every Lenis scroll event updates ScrollTrigger so
 * scrubbed timelines stay perfectly in sync with the smoothed value.
 * Skips smoothing entirely under prefers-reduced-motion (native scroll still
 * updates ScrollTrigger).
 */
export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}

/** Smooth-scroll to an anchor, falling back to native when Lenis is absent. */
export function scrollToSection(hash: string) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0 });
  else el.scrollIntoView({ behavior: "smooth" });
}
