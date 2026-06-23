import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Projects() {
  const wipProjects = projects.filter((p) => p.wip);
  const liveProjects = projects.filter((p) => !p.wip);

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

      {liveProjects.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl text-text-primary">Live</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-text-primary">
          Tools for job searchers
        </h2>
        <Link
          to="/projects/job-search"
          className="preview-card group mt-6 block max-w-2xl"
        >
          <h3 className="font-serif text-xl text-text-primary group-hover:text-accent">
            Prompts
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Copy-ready prompts for job matching, outreach, and search
            automation.
          </p>
        </Link>
      </section>

      {wipProjects.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl text-text-primary">
            Work in Progress
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Active builds — not yet deployed or still being refined.
          </p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wipProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  const hasLinks = project.appLink || project.link;

  return (
    <li className="project-card">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-serif text-xl text-text-primary">
          {project.title}
        </h2>
        {project.wip && (
          <span className="shrink-0 rounded-sm bg-surface px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-accent">
            WIP
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>
      {hasLinks && (
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {project.appLink && (
            <a
              href={project.appLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent text-sm"
            >
              Open app
            </a>
          )}
          {project.link && (
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
      )}
    </li>
  );
}
