import { useState } from "react";
import { Link } from "react-router-dom";
import { aiPrompts } from "../data/aiPrompts";

export default function AiPrompting() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <Link to="/" className="link-accent text-sm">
          ← Back to Home
        </Link>
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Prompts
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary">
          AI prompting
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-secondary">
          Copy-ready prompts I use for research, interview prep, and decision
          support.
        </p>
      </section>

      <ul className="mt-12 space-y-6">
        {aiPrompts.map((prompt) => (
          <AiPromptCard key={prompt.slug} prompt={prompt} />
        ))}
      </ul>
    </div>
  );
}

function AiPromptCard({ prompt }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <li className="rounded-sm border border-border bg-background p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="font-serif text-xl text-text-primary">{prompt.title}</h2>
        {prompt.githubLink && (
          <a
            href={prompt.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent text-sm"
          >
            View on GitHub
          </a>
        )}
      </div>
      {prompt.description && (
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {prompt.description}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowPrompt((open) => !open)}
          className="btn-primary text-sm"
          aria-expanded={showPrompt}
        >
          {showPrompt ? "Hide prompt" : "Prompt"}
        </button>
        {showPrompt && (
          <button
            type="button"
            onClick={handleCopy}
            className="text-sm text-accent transition-colors hover:underline"
          >
            {copied ? "Copied" : "Copy prompt"}
          </button>
        )}
      </div>
      {showPrompt && (
        <pre className="mt-5 whitespace-pre-wrap rounded-sm border border-border bg-surface p-4 text-sm leading-relaxed text-text-primary">
          {prompt.content}
        </pre>
      )}
    </li>
  );
}
