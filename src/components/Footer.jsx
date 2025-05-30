import React from 'react';
import { Github as GitHub, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div>
            <h3 className="footer-title">Ayush Bhardwaj</h3>
            <p className="footer-subtitle">Software Engineer & Web Developer</p>
          </div>
          <div className="footer-socials">
            <a
              href="https://github.com/Ayush7970"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label="GitHub"
            >
              <GitHub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/ayush--bhardwaj"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
            href="https://mail.google.com/mail/?view=cm&to=ayush975600@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          </div>
          <button
            onClick={scrollToTop}
            className="footer-scrolltop"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ayush Bhardwaj. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
