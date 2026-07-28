import type { Project } from "../data/projects";

export function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  return (
    <a
      className="card"
      href={`https://github.com/${p.repo}`}
      target="_blank"
      rel="noreferrer"
      data-reveal
    >
      <div className="card-top">
        <h3>{p.name}</h3>
        <span className="card-idx">{String(idx + 1).padStart(2, "0")}</span>
      </div>
      <p>{p.desc}</p>
      <div className="card-tags">
        {p.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <span className="card-link">View repo →</span>
    </a>
  );
}
