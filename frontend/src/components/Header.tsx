import { useEffect, useState } from "react";
import "./Header.css";

const NAV_ITEMS = [
  { label: "Intro", href: "#intro" },
  { label: "Bio", href: "#bio" },
  { label: "Interests", href: "#interests" },
  { label: "Tools", href: "#tools" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [open, setOpen] = useState(false);

  // Close the menu with Escape while it's open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Reset the menu if the window grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          className="site-header__logo"
          href="#intro"
          onClick={() => setOpen(false)}
        >
          AR.
        </a>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="site-header__bar" />
          <span className="site-header__bar" />
          <span className="site-header__bar" />
        </button>

        <nav
          id="primary-nav"
          className="site-header__nav"
          aria-label="Primary"
          data-open={open}
        >
          <ul>
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
