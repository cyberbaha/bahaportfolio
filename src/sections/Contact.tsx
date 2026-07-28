import { useEffect } from "react";
import gsap from "gsap";
import { useReveal } from "../lib/useReveal";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/cyberbaha" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/baha-salhi-38b82b280",
  },
];

export function Contact() {
  const ref = useReveal<HTMLElement>();

  // Magnetic pull on the email button — the one focal element that earns it.
  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>(".email-btn");
    if (!el) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (coarse || reduce) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.4,
      ease: "elastic.out(1,0.4)",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.4,
      ease: "elastic.out(1,0.4)",
    });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.3);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);

  return (
    <section className="section contact" id="contact" ref={ref}>
      <span className="ghost" aria-hidden>
        CONTACT
      </span>
      <div className="section-inner">
        <p className="eyebrow" data-reveal>
          04 // Contact
        </p>
        <h2 className="contact-title" data-reveal>
          Let&rsquo;s build something.
        </h2>
        <a
          className="email-btn"
          href="mailto:Baha.ssalhi@gmail.com"
          data-reveal
        >
          Baha.ssalhi@gmail.com
        </a>
        <div className="socials" data-reveal>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <p className="footer" data-reveal>
          © 2026 Baha Salhi · Built with React, Three.js &amp; GSAP
        </p>
      </div>
    </section>
  );
}
