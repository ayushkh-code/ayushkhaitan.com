import { useState } from "react";

const HEADSHOT_SRC = "/headshot.jpg";

export default function Headshot({ className = "h-48 w-48" }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${className} flex shrink-0 items-center justify-center rounded-full border-4 border-white/20 bg-accent-light font-serif text-3xl text-white shadow-lg`}
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
      className={`${className} shrink-0 rounded-full border-4 border-white/30 object-cover shadow-lg ring-2 ring-accent-light/40`}
      onError={() => setHasError(true)}
    />
  );
}
