import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { jobSearchPrompts } from "../data/jobSearchResources";
import PromptCard from "../components/PromptCard";

export default function JobSearch() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const element = document.querySelector(hash);
    element?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);
  return (
    <div className="page-shell">
      <section className="page-hero">
        <Link to="/projects" className="link-accent text-sm">
          ← Back to Projects
        </Link>
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Resources
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary">
          Tools for job searchers
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-secondary">
          Copy-ready prompts and workflows for an active job search.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-text-primary">Prompts</h2>
        <ul className="mt-6 space-y-6">
          {jobSearchPrompts.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </ul>
      </section>
    </div>
  );
}
