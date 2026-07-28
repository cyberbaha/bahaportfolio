import { useReveal } from "../lib/useReveal";

const GROUPS: { k: string; items: string[] }[] = [
  { k: "Languages", items: ["Dart", "JavaScript", "PHP", "HTML", "CSS"] },
  { k: "Frontend", items: ["Flutter", "Responsive UI", "Material Design"] },
  { k: "Backend", items: ["Firebase", "REST APIs"] },
  { k: "IT Support", items: ["Windows 10/11", "Microsoft 365", "Active Directory", "Remote Desktop"] },
  { k: "Networking", items: ["LAN/WAN", "TCP/IP", "DNS", "DHCP"] },
  { k: "Tools", items: ["Git", "GitHub", "VS Code", "Hardware Diagnostics"] },
];

export function Skills() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="section" id="skills" ref={ref}>
      <span className="ghost" aria-hidden>
        SKILLS
      </span>
      <div className="section-inner">
        <div className="skills-wrap">
          <p className="eyebrow" data-reveal>
            02 // Skills
          </p>
          <h2 className="section-title" data-reveal>
            What I work with
          </h2>
          {GROUPS.map((g) => (
            <div className="skill-group" key={g.k} data-reveal>
              <p className="k">{g.k}</p>
              <div className="pills">
                {g.items.map((s) => (
                  <span className="pill" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
