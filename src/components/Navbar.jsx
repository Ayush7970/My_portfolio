import React, { useEffect, useState, useId } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  {
    label: "My Portfolio",
    id: "portfolio",
    submenu: [
      { label: "Experience", path: "/experience" },
      { label: "Projects", path: "/projects" },
      { label: "Co-Curricular", path: "/activities" },
    ],
  },
  { label: "Hackathons", id: "hackathon" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSub, setOpenSub] = useState(false); // mobile accordion
  const location = useLocation();
  const navigate = useNavigate();
  const menuId = useId();

  // shadow/background change on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change / resize to desktop
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSub(false);
  }, [location.pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) {
        setIsMenuOpen(false);
        setOpenSub(false);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(v => !v);

  // Scroll to a section (from any route)
  const scrollToSection = (sectionId) => {
    const go = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 64; // navbar height
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      // Allow DOM to render then scroll
      setTimeout(go, 50);
    } else {
      go();
    }

    setIsMenuOpen(false);
    setOpenSub(false);
  };

  const DesktopLinks = () => (
    <nav className="navbar-links" aria-label="Primary">
      {NAV_ITEMS.map(item =>
        item.submenu ? (
          <div className="has-submenu" key={item.label}>
            <button
              className="nav-link"
              onClick={() => scrollToSection(item.id)}
              aria-haspopup="true"
              aria-expanded="false"
            >
              {item.label}
            </button>
            <div className="navbar-submenu">
              {item.submenu.map(sub => (
                <button
                  key={sub.label}
                  className="nav-link"
                  onClick={() => navigate(sub.path)}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            key={item.label}
            className="nav-link"
            onClick={() =>
              item.path ? navigate(item.path) : scrollToSection(item.id)
            }
          >
            {item.label}
          </button>
        )
      )}
    </nav>
  );

  return (
    <header className={`navbar${isScrolled ? " scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          Ayush Bhardwaj
        </div>

        {/* Desktop */}
        <DesktopLinks />

        {/* Burger */}
        <button
          className="navbar-menu-btn"
          onClick={toggleMenu}
          aria-controls={menuId}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile overlay + menu */}
      <div
        className={`navbar-backdrop${isMenuOpen ? " open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      />
      <nav
        id={menuId}
        className={`navbar-mobile${isMenuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile"
        onClick={(e) => e.stopPropagation()}
      >
        {NAV_ITEMS.map(item =>
          item.submenu ? (
            <div className="mobile-item" key={item.label}>
              <button
                className="mobile-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>

              {/* Accordion toggle */}
              <button
                className="mobile-accordion"
                aria-expanded={openSub}
                aria-controls="mobile-submenu"
                onClick={() => setOpenSub(v => !v)}
              >
                <ChevronDown size={18} />
              </button>

              <div
                id="mobile-submenu"
                className={`mobile-submenu${openSub ? " show" : ""}`}
              >
                {item.submenu.map(sub => (
                  <button
                    key={sub.label}
                    className="mobile-sublink"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setOpenSub(false);
                      navigate(sub.path);
                    }}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              key={item.label}
              className="mobile-link"
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                } else {
                  scrollToSection(item.id);
                }
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          )
        )}
      </nav>
    </header>
  );
}
