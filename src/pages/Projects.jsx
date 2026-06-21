import { projects } from "../data/projects";

export default function Projects() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Side Projects
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-secondary">
          Tools and experiments built to solve practical operational problems.
        </p>
      </section>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.title} className="project-card">
            <h2 className="font-serif text-xl text-text-primary">
              {project.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
              {project.description}
            </p>
            <div className="mt-6">
              {project.comingSoon ? (
                <span className="inline-block rounded-sm bg-surface px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-accent">
                  Coming Soon
                </span>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-accent text-sm"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
