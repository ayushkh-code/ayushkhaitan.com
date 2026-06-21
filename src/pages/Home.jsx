import { Link } from "react-router-dom";
import { bioParagraphs } from "../data/bio";
import Headshot from "../components/Headshot";

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
            <p className="mt-3 text-lg text-accent">
              Strategy, Finance &amp; Operations Leader
            </p>
            <div className="mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-text-primary">
              {bioParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Headshot className="h-52 w-52" />
          </div>
        </div>
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
