import { useState } from "react";
import "../styles/navbar.css";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <div className="nav-wrapper">
      <nav className="nav-tabs">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`nav-tab ${active === link.label ? "active" : ""}`}
            onClick={() => setActive(link.label)}
          >
            <span className="tab-shine" />
            {link.label}
          </a>
        ))}
      </nav>
      <div className="nav-bar" />
    </div>
  );
}

export default Navbar;
