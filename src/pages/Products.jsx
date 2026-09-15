import { productCategories } from "../data/products";

const statusLabel = {
  live: "Live",
  "coming-soon": "Coming soon",
  placeholder: "Coming soon",
};

export default function Products() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Digital products
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary">
          Products
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-secondary">
          Prompts, workflows, and templates you can buy once and run yourself.
          Categories below are scaffolding while more items go live.
        </p>
      </section>

      <div className="mt-12 space-y-14">
        {productCategories.map((category) => (
          <section
            key={category.slug}
            id={category.slug}
            aria-labelledby={`${category.slug}-heading`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id={`${category.slug}-heading`}
                  className="font-serif text-2xl text-text-primary"
                >
                  {category.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-text-secondary">
                  {category.description}
                </p>
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {category.products.length}{" "}
                {category.products.length === 1 ? "item" : "items"}
              </p>
            </div>

            <ol className="mt-6 divide-y divide-border overflow-hidden rounded-sm border border-border bg-background shadow-sm">
              {category.products.map((product, index) => (
                <li
                  key={product.slug}
                  className="bg-background even:bg-surface/60"
                >
                  <ProductRow product={product} index={index + 1} />
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

function ProductRow({ product, index }) {
  const isLive = product.status === "live" && product.link;
  const Wrapper = isLive ? "a" : "div";
  const wrapperProps = isLive
    ? {
        href: product.link,
        target: "_blank",
        rel: "noopener noreferrer",
        className:
          "group flex flex-col gap-3 px-6 py-6 transition-colors hover:bg-surface sm:flex-row sm:items-start sm:justify-between",
      }
    : {
        className:
          "flex flex-col gap-3 px-6 py-6 sm:flex-row sm:items-start sm:justify-between",
      };

  return (
    <Wrapper {...wrapperProps}>
      <div className="flex min-w-0 gap-4">
        <span
          className="mt-1 shrink-0 font-mono text-xs font-medium tracking-wide text-accent"
          aria-hidden="true"
        >
          {String(index).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3
              className={`font-serif text-xl text-text-primary ${
                isLive ? "group-hover:text-accent" : ""
              }`}
            >
              {product.title}
            </h3>
            <span
              className={`rounded-sm px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide ${
                isLive
                  ? "bg-accent/10 text-accent"
                  : "bg-surface text-text-secondary"
              }`}
            >
              {statusLabel[product.status] ?? product.status}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {product.description}
          </p>
        </div>
      </div>

      <div className="shrink-0 pl-8 sm:pl-0 sm:text-right">
        {product.price && (
          <p className="text-sm font-medium text-text-primary">{product.price}</p>
        )}
        {isLive ? (
          <p className="mt-1 text-sm text-accent group-hover:underline">
            View product
          </p>
        ) : (
          <p className="mt-1 text-sm text-text-secondary">Details soon</p>
        )}
      </div>
    </Wrapper>
  );
}
