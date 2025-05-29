import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

// List of sections for navigation
const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  {
    label: 'My Portfolio',
    id: 'portfolio',
    submenu: [
      { label: 'Experience', path: '/experience' },
      { label: 'Projects', path: '/projects' },
      { label: 'Co-Curricular', path: '/activities' },
    ],
  },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Scroll to section (works if on homepage)
  const scrollToSection = (sectionId) => {
    // If not on homepage, go there first, then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 64, // navbar height
            behavior: 'smooth',
          });
        }
      }, 100); // wait for home to render
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 64,
          behavior: 'smooth',
        });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Name/Logo - Always goes to Home */}
        <div
          className="navbar-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Ayush Bhardwaj
        </div>
        {/* Desktop Navigation */}
        <nav className="navbar-links">
          {NAV_ITEMS.map((item) =>
            item.submenu ? (
              <div className="has-submenu" style={{ position: "relative", display: "inline-block" }} key={item.label}>
                <button className="nav-link">{item.label}</button>
                <div className="navbar-submenu">
                  {item.submenu.map((sub) => (
                    <button
                      key={sub.label}
                      className="nav-link"
                      // Route to separate pages for Experience/Projects/Co-Curricular
                      onClick={() => {
                        setIsMenuOpen(false);
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
                className="nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="navbar-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            {NAV_ITEMS.map((item) =>
              item.submenu ? (
                <div key={item.label}>
                  <span className="nav-link-mobile" style={{ fontWeight: 'bold' }}>{item.label}</span>
                  {item.submenu.map((sub) => (
                    <button
                      key={sub.label}
                      className="nav-link-mobile"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate(sub.path);
                      }}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={item.label}
                  className="nav-link-mobile"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
