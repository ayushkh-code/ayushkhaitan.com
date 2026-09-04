import { useState } from "react";
import { Link } from "react-router-dom";
import {
  aiHomeParagraphs,
  aiHomeTitle,
  bioParagraphs,
} from "../data/bio";
import { aiPrompts } from "../data/aiPrompts";
import Headshot from "../components/Headshot";
import { ReadMoreParagraphs } from "../components/ReadMore";

const previewCards = [
  {
    to: "/writing",
    title: "Writing",
    description:
      "Long-form essays on supply chain strategy, S&OP, and operations leadership.",
  },
  {
    to: "/projects",
    title: "Projects",
    description:
      "Side projects and tools built to solve practical operational problems.",
  },
  {
    to: "/about",
    title: "About & Contact",
    description:
      "Professional background, interests, and ways to get in touch.",
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Strategy · Finance · Operations
            </p>
            <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary sm:text-5xl">
              Ayush Khaitan
            </h1>

            <ReadMoreParagraphs
              paragraphs={bioParagraphs}
              previewCount={1}
              className="mt-10"
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/" className="btn-primary text-sm">
                Home
              </Link>
              <Link to="/writing" className="btn-primary text-sm">
                Writing
              </Link>
              <Link to="/projects" className="btn-primary text-sm">
                Projects
              </Link>
              <a href="#ai-prompting" className="btn-primary text-sm">
                AI prompting
              </a>
            </div>

            <section className="mt-10 border-t border-border pt-10">
              <h2 className="font-serif text-2xl text-text-primary">
                {aiHomeTitle}
              </h2>
              <ReadMoreParagraphs
                paragraphs={aiHomeParagraphs}
                previewCount={3}
                className="mt-6"
              />
            </section>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Headshot className="h-52 w-52" />
          </div>
        </div>
      </section>

      <section id="ai-prompting" className="mt-16 scroll-mt-24">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-2xl text-text-primary">AI prompting</h2>
          <div className="h-px flex-1 bg-accent/30" aria-hidden="true" />
        </div>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Copy-ready prompts I use for research, interview prep, and decision
          support.
        </p>
        <ul className="mt-8 space-y-6">
          {aiPrompts.map((prompt) => (
            <AiPromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-2xl text-text-primary">Explore</h2>
          <div className="h-px flex-1 bg-accent/30" aria-hidden="true" />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewCards.map((card) => (
            <Link key={card.to} to={card.to} className="preview-card group">
              <h3 className="font-serif text-xl text-text-primary group-hover:text-accent">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
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
      <h3 className="font-serif text-xl text-text-primary">{prompt.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {prompt.description}
      </p>
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
