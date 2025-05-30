import React from 'react';
import { FileText } from 'lucide-react';


import { ArrowDownCircle, Github, Linkedin, Mail } from 'lucide-react'; // keep this if you're using lucide-react
import { TypeAnimation } from 'react-type-animation'; // if you use react-type-animation

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="hero-container">
        <div className="hero-img-wrapper">
        <img
        src= "/headshot2.jpg" 
        alt="Ayush Bhardwaj"
        className="hero-img"
        />
        </div>

      <h1 className="hero-title">
        Hi, I'm <span className="accent">Ayush Bhardwaj</span>
      </h1>
      <div className="hero-typing">
        <TypeAnimation
          sequence={[
            'Software Engineer', 1000,
            'Web Developer', 1000,
            'ML Engineer', 1000,
            'Android Developer', 1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
      <p className="hero-desc">
        Turning caffeine into clean code and big ideas into amazing products.
      </p>
      <div className="hero-links">
        <a
          href="https://github.com/Ayush7970"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn"
        >
          <Github size={18} /> GitHub
        </a>
        <a
          href="https://linkedin.com/in/ayush--bhardwaj"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn"
        >
          <Linkedin size={18} /> LinkedIn
        </a>
        <a
          href="/Ayush_Bhardwaj_Resume.pdf"
          className="hero-btn primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText size={18} style={{ marginRight: 7, marginBottom: -2 }} />
          Resume
        </a>
      </div>
      <button
        onClick={scrollToContact}
        className="hero-scroll-btn"
        aria-label="Scroll down"
      >
        <ArrowDownCircle size={36} />
      </button>
    </section>
  );
};

export default Hero;
