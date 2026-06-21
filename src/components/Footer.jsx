import { contact } from "../data/bio";

export default function Footer() {
  return (
    <footer className="mt-auto bg-surface-dark text-text-on-dark-muted">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ayush Khaitan</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={`mailto:${contact.email}`}
            className="transition-colors hover:text-text-on-dark"
          >
            {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-on-dark"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
