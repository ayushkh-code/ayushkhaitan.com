import { Link, useParams } from "react-router-dom";
import {
  formatArticleDate,
  getArticleBySlug,
} from "../data/articles";

export default function Article() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="page-shell">
        <p className="text-text-secondary">Article not found.</p>
        <Link to="/writing" className="link-accent mt-4 inline-block">
          Back to Writing
        </Link>
      </div>
    );
  }

  const paragraphs = article.content.split("\n\n");

  return (
    <article className="page-shell">
      <section className="page-hero">
        <Link to="/writing" className="link-accent text-sm">
          ← Back to Writing
        </Link>

        <header className="prose-article mt-8">
          <h1 className="mb-4 font-serif text-4xl leading-tight tracking-tight text-text-primary">
            {article.title}
          </h1>
          <time
            dateTime={article.date}
            className="block text-sm font-medium text-accent"
          >
            {formatArticleDate(article.date)}
          </time>
        </header>
      </section>

      <div className="prose-article mt-10 rounded-sm border border-border bg-background p-8 shadow-sm sm:p-10">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
