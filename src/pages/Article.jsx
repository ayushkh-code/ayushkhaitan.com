import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  formatArticleDate,
  getArticleBySlug,
} from "../data/articles";

function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm bg-white/10 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/20"
      >
        Close
      </button>
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[90vh] max-w-full cursor-zoom-out rounded-sm object-contain shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

function ArticleImage({ image }) {
  const [zoomed, setZoomed] = useState(false);

  if (!image) return null;

  return (
    <>
      <figure className="my-8">
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="group block w-full cursor-zoom-in text-left"
          aria-label={`Zoom image: ${image.alt}`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full rounded-sm border border-border transition group-hover:border-accent/40 group-hover:shadow-md"
          />
        </button>
        {image.caption && (
          <figcaption className="mt-3 text-sm text-text-secondary">
            {image.caption}
          </figcaption>
        )}
      </figure>
      {zoomed && (
        <ImageLightbox image={image} onClose={() => setZoomed(false)} />
      )}
    </>
  );
}

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
  const imageAfter = article.image?.afterParagraph ?? -1;

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
        {paragraphs.map((paragraph, index) => (
          <div key={paragraph.slice(0, 48)}>
            <p>{paragraph}</p>
            {article.image && index === imageAfter && (
              <ArticleImage image={article.image} />
            )}
          </div>
        ))}
        {article.images?.map((image) => (
          <ArticleImage key={image.src} image={image} />
        ))}
      </div>
    </article>
  );
}
