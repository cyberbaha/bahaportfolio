import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROTATING = ["Building", "Solving", "Shipping"];

/** Split a word into masked chars the intro timeline can raise one by one. */
function Chars({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((ch, i) => (
        <span className="hn-mask" key={i} aria-hidden>
          <span className="hn-ch">{ch}</span>
        </span>
      ))}
    </>
  );
}

/**
 * Moncy-style hero: the avatar owns the center of the stage, and the type
 * flanks him — intro block mid-left, role block mid-right. Modest type sizes;
 * the character is the hero, not the font.
 */
export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Hero content drifts up + fades as you scroll into About (scrubbed).
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.to([".hero-grid", ".hero-caption"], {
        opacity: 0,
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom 62%",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section hero" id="hero">
      <p className="hero-caption">
        [ Tunisia <b>//</b> IT Support &amp; Flutter Developer ]
      </p>

      <div className="hero-grid">
        <div className="hero-left">
          <p className="hero-hello">Hello! I&rsquo;m</p>
          <h1 className="hero-name" aria-label="Baha Salhi">
            <span className="hn-line">
              <Chars word="BAHA" />
            </span>
            <span className="hn-line">
              <Chars word="SALHI" />
            </span>
          </h1>
          <span className="hero-glint" />
        </div>

        <div className="hero-mid" aria-hidden />

        <div className="hero-right">
          <p className="hero-hello">A Full-Stack</p>
          <h2 className="hero-role">Developer</h2>
          <p className="hero-sub">
            <span className="hero-rotator">
              <span key={i}>{ROTATING[i]}</span>
            </span>
          </p>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}
