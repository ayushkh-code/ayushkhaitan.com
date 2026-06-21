import { bioParagraphs, contact } from "../data/bio";
import Headshot from "../components/Headshot";

export default function About() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              About
            </p>
            <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary">
              Ayush Khaitan
            </h1>
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

      <section className="section-band mt-12">
        <h2 className="font-serif text-2xl text-text-primary">Contact</h2>
        <div className="mt-4 flex flex-col gap-3 text-[1.0625rem]">
          <a href={`mailto:${contact.email}`} className="link-accent">
            {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            linkedin.com/in/ayushkhaitan
          </a>
        </div>
      </section>
    </div>
  );
}
