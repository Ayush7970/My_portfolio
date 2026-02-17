// Hero.jsx
import React, { useMemo, useState } from "react";
import {
  ArrowDownCircle,
  Github,
  Linkedin,
  Newspaper,
  FileText,
  Briefcase,
  FolderKanban,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import MolecularBackground from "./MolecularBackground";

const Hero = () => {
  const [active, setActive] = useState(-1);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const actions = useMemo(
    () => [
      {
        label: "Linkedin",
        icon: <Briefcase size={18} />,
        href: "https://www.linkedin.com/in/ayush--bhardwaj",
        external: true,
        tone: "blue",
      },
      {
        label: "Devpost",
        icon: <FolderKanban size={18} />,
        href: "https://devpost.com/ayush975600?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav",
        external: true,
        tone: "blue",
      },
      {
        label: "GitHub",
        icon: <Github size={18} />,
        href: "https://github.com/Ayush7970",
        external: true,
        tone: "blue",
      },
      {
        label: "Medium",
        icon: <Newspaper size={18} />,
        // If your actual LinkedIn differs, change only this line:
        href: "/medium",
        external: false,
        tone: "blue",
        type: "link",
      },
      {
        label: "Resume",
        icon: <FileText size={18} />,
        href: "/Ayush_Bhardwaj_Resume.pdf",
        external: true,
        tone: "blue",
      },
    ],
    []
  );

  const get3DStyle = (idx) => {
    if (active === -1) return undefined;

    const dx = idx - active;
    const adx = Math.abs(dx);
    const sign = dx === 0 ? 0 : dx / adx;

    // Carousel arc + depth (NO tilt/rotation)
    const x =
      adx === 0 ? 0 : sign * (adx === 1 ? 18 : adx === 2 ? 34 : 48);
    const z = adx === 0 ? 90 : adx === 1 ? 52 : adx === 2 ? 26 : 10;
    const y = adx === 0 ? -10 : adx === 1 ? -6 : adx === 2 ? -2 : 0;
    const s = adx === 0 ? 1.06 : adx === 1 ? 1.02 : adx === 2 ? 0.99 : 0.97;

    const opacity = adx >= 3 ? 0.72 : 1;
    const blur = idx === active ? 0 : adx >= 3 ? 0.6 : 0;

    return {
      transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) scale(${s})`,
      opacity,
      filter: blur ? `blur(${blur}px)` : "none",
    };

  };

  return (
    <>
      <section id="hero" className="hero-container">
        <MolecularBackground />

        <div className="hero-img-wrapper">
          <img
            src="/heradshot_convert.jpg"
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
              "Software Engineer",
              1000,
              "Full Stack Engineer",
              1000,
              "AI & Agentic Systems Engineer",
              1000,
              "Multi-Time Hackathon Winner",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <p className="hero-desc">
          Turning caffeine into clean code and big ideas into amazing products.
        </p>

        {/* ✅ 5 elements, equal sizing, “3D carousel pop” on hover */}
        <div
          className="hero-links hero-links-carousel"
          onMouseLeave={() => setActive(-1)}
        >
          {actions.map((a, idx) => {
            const isActive = idx === active;
            const cls = [
              "hero-btn",
              "hero-btn-3d",
              a.tone === "gold" ? "primary" : "",
              isActive ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <a
                key={a.label}
                href={a.href}
                className={cls}
                style={get3DStyle(idx)}
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                onBlur={() => setActive(-1)}
                target={a.external ? "_blank" : undefined}
                rel={a.external ? "noopener noreferrer" : undefined}
              >
                <span className="hero-btn-inner">
                  {a.icon}
                  <span className="hero-btn-text">{a.label}</span>
                </span>
              </a>
            );
          })}
        </div>

        <button
          onClick={scrollToContact}
          className="hero-scroll-btn"
          aria-label="Scroll down"
        >
          <ArrowDownCircle size={36} />
        </button>

      </section>
    </>
  );
};

export default Hero;
