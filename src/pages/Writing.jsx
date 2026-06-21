import { Link } from "react-router-dom";
import {
  formatArticleDate,
  getSortedArticles,
} from "../data/articles";

export default function Writing() {
  const articles = getSortedArticles();

  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Essays
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary">
          Writing
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-secondary">
          Essays on supply chain strategy, S&amp;OP, and operations leadership.
        </p>
      </section>

      <ul className="mt-12 divide-y divide-border overflow-hidden rounded-sm border border-border bg-background shadow-sm">
        {articles.map((article) => (
          <li key={article.slug} className="bg-background even:bg-surface/60">
            <Link
              to={`/writing/${article.slug}`}
              className="group block px-6 py-8 transition-colors hover:bg-surface"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <h2 className="font-serif text-2xl text-text-primary group-hover:text-accent">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-text-secondary">
                    {article.description}
                  </p>
                </div>
                <time
                  dateTime={article.date}
                  className="shrink-0 text-sm font-medium text-accent"
                >
                  {formatArticleDate(article.date)}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
