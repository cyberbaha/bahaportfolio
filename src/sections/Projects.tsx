import { projects } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { useReveal } from "../lib/useReveal";

export function Projects() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="section" id="work" ref={ref}>
      <span className="ghost" aria-hidden>
        WORK
      </span>
      <div className="section-inner">
        <div className="projects-head">
          <p className="eyebrow" data-reveal>
            03 // Work
          </p>
          <h2 className="section-title" data-reveal>
            Selected projects
          </h2>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
