import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { rig, HERO } from "../three/cameraRig";

/**
 * Loading screen → cinematic intro. Shows an amber counter while model.glb
 * loads; once ready, the overlay splits apart, the camera dollies from its
 * far intro pose into the hero frame, and the hero name letters rise in with
 * a blur-off — then hands control to the scroll timeline via onDone.
 */
export function IntroOverlay({ onDone }: { onDone: () => void }) {
  const { progress } = useProgress();
  const [gone, setGone] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      Object.assign(rig, HERO);
      ranRef.current = true;
      setGone(true);
      doneRef.current();
      return;
    }
  }, []);

  useEffect(() => {
    if (ranRef.current || progress < 100 || !wrapRef.current) return;
    ranRef.current = true;

    let completed = false;
    const tl = gsap.timeline({
      delay: 0.45,
      onComplete: () => {
        completed = true;
        setGone(true);
        doneRef.current();
      },
    });

    // hide hero UI up front so nothing flashes when the panels open
    tl.set(".hero .hn-ch", { yPercent: 115, filter: "blur(6px)" }, 0)
      .set(
        [
          ".hero-caption",
          ".hero-hello",
          ".hero-role",
          ".hero-sub",
          ".hero-glint",
          ".scroll-hint",
          ".nav",
        ],
        { opacity: 0 },
        0
      )
      .to(".intro-center", {
        opacity: 0,
        y: -26,
        duration: 0.45,
        ease: "power2.in",
      })
      // panels split apart
      .to(".intro-top", { yPercent: -101, duration: 1, ease: "power4.inOut" }, 0.35)
      .to(".intro-bottom", { yPercent: 101, duration: 1, ease: "power4.inOut" }, 0.35)
      // camera dollies from the far intro pose into the hero frame
      .to(rig, { ...HERO, duration: 2.0, ease: "power3.inOut" }, 0.45)
      // hero name letters rise with a blur-off, Moncy-style
      .fromTo(
        ".hero .hn-ch",
        { yPercent: 115, filter: "blur(6px)" },
        {
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.045,
          ease: "power3.out",
        },
        0.95
      )
      .fromTo(
        [
          ".hero-hello",
          ".hero-role",
          ".hero-sub",
          ".hero-glint",
          ".hero-caption",
          ".scroll-hint",
          ".nav",
        ],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" },
        1.55
      );

    return () => {
      // StrictMode dev double-mount: if killed before finishing, allow the
      // remounted effect to rebuild and run the intro fresh.
      if (!completed) {
        tl.kill();
        ranRef.current = false;
      }
    };
  }, [progress]);

  if (gone) return null;

  return (
    <div className="intro" ref={wrapRef}>
      <div className="intro-panel intro-top" />
      <div className="intro-panel intro-bottom" />
      <div className="intro-center">
        <p className="intro-label">// Loading assets</p>
        <p className="intro-pct">{Math.round(progress)}%</p>
        <div className="intro-bar">
          <div className="intro-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="intro-logo">
          BS<span>//</span>
        </p>
      </div>
    </div>
  );
}
