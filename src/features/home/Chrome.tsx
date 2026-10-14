import { useEffect, useState } from "react"
import { site } from "../../content/site"
import {
  aboutHref,
  classesHref,
  contactHref,
  trainersHref,
  type Route,
} from "../classes/router"

type HeaderProps = {
  current: Route
}

const links: { label: string; href: string; route: Route }[] = [
  { label: "Home", href: "#/", route: "home" },
  { label: "Classes", href: classesHref, route: "classes" },
  { label: "Trainers", href: trainersHref, route: "trainers" },
  { label: "About", href: aboutHref, route: "about" },
  { label: "Contact", href: contactHref, route: "contact" },
]

export function Header({ current }: HeaderProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [current])

  return (
    <header className={`site-header${open ? " site-header--open" : ""}`}>
      <div className="container site-header__inner">
        <a className="brand" href="#/" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden>
            HD
          </span>
          {site.name}
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>

        <nav
          id="primary-nav"
          className={`nav${open ? " nav--open" : ""}`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <a
              key={link.route}
              className={`nav__link${current === link.route ? " nav__link--active" : ""}`}
              href={link.href}
              aria-current={current === link.route ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span>{site.name} — Train hard. Start free.</span>
        <span>{site.address}</span>
      </div>
    </footer>
  )
}