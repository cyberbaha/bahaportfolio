import { useReveal } from "../lib/useReveal";

const FACTS = [
  { k: "Origin", v: "Tunisia" },
  { k: "Education", v: "BTS in IT Management" },
  { k: "Status", v: "IT Support & Flutter Developer" },
  { k: "Focus", v: "Help Desk · Networking · Flutter" },
];

export function About() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="section" id="about" ref={ref}>
      <span className="ghost" aria-hidden>
        ABOUT
      </span>
      <div className="section-inner">
        <div className="about-wrap">
          <p className="eyebrow" data-reveal>
            01 // About
          </p>
          <h2 className="section-title" data-reveal>
            A bit about me
          </h2>
          <p className="lead" data-reveal>
            IT professional with hands-on experience in help desk support,
            hardware and software troubleshooting, and networking fundamentals,
            combined with practical development in Flutter, Dart, and Firebase.
          </p>
          <ul className="facts">
            {FACTS.map((f) => (
              <li key={f.k} data-reveal>
                <span className="k">{f.k}</span>
                <span className="v">{f.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
