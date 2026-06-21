import { NavLink } from "react-router-dom";
import { contact } from "../data/bio";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/writing", label: "Writing" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
];

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

            <div className="flex items-center gap-4 text-sm lg:hidden">
              <a href={`mailto:${contact.email}`} className="nav-contact-link">
                Email
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-contact-link"
              >
                LinkedIn
              </a>
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

            <div className="hidden items-center gap-4 border-l border-white/15 pl-6 text-sm lg:flex">
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
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-accent-light" aria-hidden="true" />
    </header>
  );
}
