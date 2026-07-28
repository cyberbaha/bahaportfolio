import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Single mutable rig object. Tweened by GSAP (intro + scroll scrub), read by
 * the R3F frame loop every frame.
 *  - `look`: 0..1, how strongly the head tracks the mouse (fades off when the
 *    avatar is turned away from camera).
 *  - `rim`:  teal rim intensity multiplier — light shifts between sections.
 *
 * The avatar's Y rotation accumulates full turns (2π, 4π) across the page so
 * he SPINS as you scroll between sections instead of standing at one angle.
 */
export const rig = {
  camX: 0,
  camY: 1.7,
  camZ: 7.0,
  tgtX: 0,
  tgtY: 0.3,
  tgtZ: 0,
  avX: 0,
  avY: -1.42,
  avZ: 0,
  avRY: -0.6,
  look: 0,
  rim: 0.35,
  wave: 0, // 0..1 — right-arm wave gesture weight (Contact)
  point: 0, // 0..1 — left-arm point-at-cards weight (Projects)
};

const TAU = Math.PI * 2;

/** Hero — zoomed in to the stomach, dead center, facing viewer, head alive. */
export const HERO = {
  camX: 0,
  camY: 0.1,
  camZ: 1.95,
  tgtX: 0,
  tgtY: 0.22,
  tgtZ: 0,
  avX: 0,
  avY: -1.42,
  avZ: 0,
  avRY: 0,
  look: 1,
  rim: 1,
  wave: 0,
  point: 0,
};

/** About — camera drifts left; avatar slides RIGHT, turns toward the text. */
const ABOUT = {
  camX: -0.55,
  camY: 0.18,
  camZ: 2.15,
  tgtX: 0.42,
  tgtY: 0.24,
  tgtZ: 0,
  avX: 0.95,
  avY: -1.42,
  avZ: 0,
  avRY: -0.38,
  look: 0.35,
  rim: 1.3,
  wave: 0,
  point: 0,
};

/** Skills — avatar does a FULL SPIN landing on his side; camera orbits around
 *  so he sits in the left third while pills own the right. */
const SKILLS = {
  camX: 1.55,
  camY: 0.5,
  camZ: 1.7,
  tgtX: 0.45,
  tgtY: 0.12,
  tgtZ: 0,
  avX: -0.3,
  avY: -1.42,
  avZ: 0,
  avRY: TAU + 0.12,
  look: 0,
  rim: 1.55,
  wave: 0,
  point: 0,
};

/** Projects — camera swoops up-and-back (arc), avatar far left, small. */
const PROJECTS = {
  camX: 0.35,
  camY: 0.4,
  camZ: 3.6,
  tgtX: 0.28,
  tgtY: 0.1,
  tgtZ: 0,
  avX: -1.35,
  avY: -1.44,
  avZ: 0,
  avRY: TAU + 0.55,
  look: 0,
  rim: 0.85,
  wave: 0,
  point: 1,
};

/** Contact — another full spin into a close, intimate, facing-you frame. */
const CONTACT = {
  camX: 0,
  camY: 0.22,
  camZ: 1.45,
  tgtX: 0,
  tgtY: 0.36,
  tgtZ: 0,
  avX: 0,
  avY: -1.42,
  avZ: 0,
  avRY: TAU * 2,
  look: 1,
  rim: 1.25,
  wave: 1,
  point: 0,
};

/**
 * Master timeline scrubbed to the full page scroll. Transitions use mid
 * keyframes so the camera travels in ARCS (crane moves), not straight lines.
 */
export function buildCameraTimeline(): gsap.core.Timeline | null {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return null;

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut", duration: 1 },
    scrollTrigger: {
      trigger: ".content-layer",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(rig, { ...ABOUT })
    .to(rig, {
      keyframes: [
        // swing out wide while he spins
        { camX: 0.4, camY: 0.85, camZ: 2.9, duration: 0.45, ease: "power2.in" },
        { ...SKILLS, duration: 0.55, ease: "power2.out" },
      ],
    })
    .to(rig, {
      keyframes: [
        // crane up and over his shoulder on the way out
        { camX: 2.1, camY: 0.95, camZ: 2.6, duration: 0.45, ease: "power2.in" },
        { ...PROJECTS, duration: 0.55, ease: "power2.out" },
      ],
    })
    .to(rig, {
      keyframes: [
        // sweep down low across the front, then push in for the finale
        { camX: -0.9, camY: 0.65, camZ: 2.9, duration: 0.5, ease: "power2.in" },
        { ...CONTACT, duration: 0.5, ease: "power2.out" },
      ],
    });

  return tl;
}
