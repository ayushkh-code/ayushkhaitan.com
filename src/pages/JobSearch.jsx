import { useState } from "react";
import { Link } from "react-router-dom";
import { jobSearchPrompts } from "../data/jobSearchPrompts";

export default function JobSearch() {
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

function PromptCard({ prompt }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewLength = 120;
  const isLong = prompt.content.length > previewLength;
  const visibleText =
    expanded || !isLong
      ? prompt.content
      : `${prompt.content.slice(0, previewLength).trim()}…`;

  async function handleCopy() {
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <li className="rounded-sm border border-border bg-background p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-serif text-xl text-text-primary">{prompt.title}</h3>
        <button
          type="button"
          onClick={handleCopy}
          className="text-sm text-accent transition-colors hover:underline"
        >
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
        {visibleText}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="link-accent mt-3 text-sm font-medium"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </li>
  );
}
