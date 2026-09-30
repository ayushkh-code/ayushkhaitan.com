import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { agentSkills } from "../data/agentSkills";
import PromptCard from "../components/PromptCard";

export default function AgentSkills() {
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
          Skills for AI agents
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-secondary">
          Copy-ready prompts that let an AI agent set up and run an automation end to end.
        </p>
      </section>

      <section className="mt-12">
        <ul className="space-y-6">
          {agentSkills.map((skill) => (
            <PromptCard key={skill.slug} prompt={skill} />
          ))}
        </ul>
      </section>
    </div>
  );
}
