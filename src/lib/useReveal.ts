import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section choreography:
 *  - [data-reveal] children stagger up+in when the section arrives
 *  - the whole inner block drifts up + fades as the section LEAVES, so
 *    transitions read as continuous motion instead of static pages
 *  - the giant ghost word parallaxes slowly against the scroll
 * All skipped under prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-reveal]"), {
        y: 54,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 62%" },
      });

      const inner = el.querySelector(".section-inner");
      if (inner) {
        gsap.to(inner, {
          opacity: 0,
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "bottom 42%",
            end: "bottom 8%",
            scrub: true,
          },
        });
      }

      const ghost = el.querySelector(".ghost");
      if (ghost) {
        gsap.fromTo(
          ghost,
          { yPercent: 22 },
          {
            yPercent: -22,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
