import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  { label: 'Hackathons', id: 'hackathon' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // <--- NEW
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
      }, 100);
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
        {/* Name/Logo */}
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
              <div
                className="has-submenu"
                key={item.label}
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setOpenSubmenu(item.label)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <button
                  className="nav-link"
                  onClick={() => scrollToSection(item.id)}
                  aria-haspopup="true"
                  aria-expanded={openSubmenu === item.label}
                >
                  {item.label}
                </button>
                <div
                  className="navbar-submenu"
                  style={{
                    display: openSubmenu === item.label ? "block" : "none",
                  }}
                >
                  {item.submenu.map((sub) => (
                    <button
                      key={sub.label}
                      className="nav-link"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenSubmenu(null); // close submenu after click
                        navigate(sub.path);
                      }}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : item.path ? (
              <button
                key={item.label}
                className="nav-link"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(item.path);
                }}
              >
                {item.label}
              </button>
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
        {/* (leave your existing mobile menu as-is) */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            {/* ... */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
