import { NavLink } from "react-router-dom";
import { contact } from "../data/bio";
import LinkedInIcon from "./LinkedInIcon";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/writing", label: "Writing" },
  { to: "/projects", label: "Projects" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
];

function SubstackIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

function TopmateLink() {
  return (
    <a
      href={contact.topmate}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-accent-light px-3 py-1 font-medium text-text-on-dark transition-colors hover:bg-accent-light hover:text-white"
    >
      Topmate
    </a>
  );
}

export default function Nav() {
  return (
    <header className="bg-surface-dark text-text-on-dark">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center justify-between gap-4 lg:justify-start">
            <NavLink
              to="/"
              className="font-serif text-lg text-text-on-dark transition-colors hover:text-accent-light"
            >
              Ayush Khaitan
            </NavLink>

            <div className="flex items-center gap-3 text-xs lg:hidden">
              <a href={`mailto:${contact.email}`} className="nav-contact-link">
                Email
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-contact-link"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href={contact.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-contact-link inline-flex items-center gap-1.5"
                aria-label="Substack"
              >
                <SubstackIcon />
                Substack
              </a>
              <TopmateLink />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
            <nav aria-label="Main navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {navItems.map(({ to, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      className={({ isActive }) =>
                        isActive ? "nav-link nav-link-active" : "nav-link"
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-3 border-l border-white/15 pl-6 text-xs lg:flex">
              <a
                href={`mailto:${contact.email}`}
                className="nav-contact-link"
              >
                {contact.email}
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-contact-link"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href={contact.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-contact-link inline-flex items-center gap-1.5"
                aria-label="Substack"
              >
                <SubstackIcon />
                Substack
              </a>
              <TopmateLink />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-accent-light" aria-hidden="true" />
    </header>
  );
}
