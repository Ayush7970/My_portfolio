import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// List of sections for navigation
const NAV_ITEMS = [
  'About',
  'Skills',
  'Experience',
  'Projects',
  'Education',
  'Contact',
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 64, // Adjust for navbar height
        behavior: 'smooth',
      });
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
          onClick={() => scrollToSection('hero')}
        >
          Ayush Bhardwaj
        </div>
        {/* Desktop Navigation */}
        <nav className="navbar-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className="nav-link"
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
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
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                className="nav-link-mobile"
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
