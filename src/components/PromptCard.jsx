import { useState } from "react";

export default function PromptCard({ prompt }) {
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
    <li
      id={prompt.slug}
      className="scroll-mt-24 rounded-sm border border-border bg-background p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-serif text-xl text-text-primary">{prompt.title}</h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <button
            type="button"
            onClick={handleCopy}
            className="text-sm text-accent transition-colors hover:underline"
          >
            {copied ? "Copied" : "Copy prompt"}
          </button>
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
      </div>
      {prompt.description && (
        <p className="mt-3 text-sm text-text-secondary">{prompt.description}</p>
      )}
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
