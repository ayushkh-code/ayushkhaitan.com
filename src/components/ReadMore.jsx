import { useState } from "react";

export function ReadMoreParagraphs({ paragraphs, previewCount = 1, className = "" }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? paragraphs : paragraphs.slice(0, previewCount);
  const hasMore = paragraphs.length > previewCount;

  return (
    <div className={className}>
      <div className="space-y-6 text-[1.0625rem] leading-relaxed text-text-primary">
        {visible.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="link-accent mt-4 text-sm font-medium"
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export function ReadMoreText({ text, previewLineCount = 4, className = "" }) {
  const [expanded, setExpanded] = useState(false);
  const lines = text.split("\n").filter((line) => line.trim());
  const visibleLines = expanded ? lines : lines.slice(0, previewLineCount);
  const hasMore = lines.length > previewLineCount;

  return (
    <div className={className}>
      <div className="space-y-4 text-[1.0625rem] leading-relaxed text-text-primary">
        {visibleLines.map((line) => (
          <p key={line.slice(0, 32)}>{line}</p>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="link-accent mt-4 text-sm font-medium"
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
