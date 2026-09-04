import { useState } from "react";

const HEADSHOT_SRC = "/headshot.jpg";

export default function Headshot({
  className = "h-48 w-48",
  compact = false,
}) {
  const [hasError, setHasError] = useState(false);
  const frame = compact
    ? "border-2 border-white/30 ring-1 ring-accent-light/40"
    : "border-4 border-white/30 ring-2 ring-accent-light/40";

  if (hasError) {
    return (
      <div
        className={`${className} ${frame} flex shrink-0 items-center justify-center rounded-full bg-accent-light font-serif text-3xl text-white shadow-lg`}
        aria-label="Ayush Khaitan"
      >
        AK
      </div>
    );
  }

  return (
    <img
      src={HEADSHOT_SRC}
      alt="Ayush Khaitan"
      className={`${className} ${frame} shrink-0 rounded-full object-cover shadow-lg`}
      onError={() => setHasError(true)}
    />
  );
}
