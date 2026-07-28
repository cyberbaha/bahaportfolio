import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "../lib/useLenis";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("hero");

  // Scrollspy: one trigger per section flips the active link.
  useEffect(() => {
    const triggers = LINKS.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => self.isActive && setActive(id),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav className="nav">
      <a
        className="nav-logo"
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("#hero");
        }}
      >
        BS<span>//</span>
      </a>
      <div className="nav-links">
        {LINKS.map(({ id, label }) => (
          <a
            key={id}
            className={`nav-link${active === id ? " active" : ""}`}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(`#${id}`);
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
