import { Link } from "react-router-dom";
import {
  aiHomeParagraphs,
  aiHomeTitle,
  bioParagraphs,
} from "../data/bio";
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
    to: "/products",
    title: "Products",
    description:
      "Prompts, workflows, and templates organized by category. Buy once, run yourself.",
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
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-2">
      <section className="-mx-6 bg-surface px-6 pb-12 pt-1.5 sm:rounded-sm sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Strategy · Finance · Operations
            </p>
            <div className="mt-4 flex items-center gap-4">
              <h1 className="min-w-0 flex-1 font-serif text-3xl tracking-tight text-text-primary sm:text-5xl">
                Ayush Khaitan
              </h1>
              <Headshot
                compact
                className="h-16 w-16 shrink-0 sm:h-20 sm:w-20 lg:hidden"
              />
            </div>

            <ReadMoreParagraphs
              paragraphs={bioParagraphs}
              previewCount={2}
              className="mt-10"
            />

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                to="/writing"
                className="rounded-full bg-accent px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-accent-light"
              >
                Writing
              </Link>
              <Link
                to="/projects"
                className="rounded-full bg-accent px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-accent-light"
              >
                Projects
              </Link>
              <Link
                to="/ai-prompting"
                className="rounded-full bg-accent px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-accent-light"
              >
                AI prompting
              </Link>
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

          <div className="hidden justify-end lg:flex">
            <Headshot className="h-52 w-52" />
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-2xl text-text-primary">Explore</h2>
          <div className="h-px flex-1 bg-accent/30" aria-hidden="true" />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
