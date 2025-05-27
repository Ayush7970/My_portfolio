import React from 'react';
import { Briefcase, Share2, Award } from 'lucide-react';

const cards = [
  {
    title: "My Experience",
    icon: <Briefcase size={36} />,
    img: "/public/experience.png", // Place your image in public/images or use src/assets and import
    desc: "Hey, welcome to my work experience! Working on group projects is my forte. Click on Learn more to explore detailed information about my professional work.",
    link: "#",
    accent: false,
  },
  {
    title: "My Projects",
    icon: <Share2 size={36} />,
    img: "/public/myproject.png",
    desc: "Hey, welcome to my collection of Computer Science projects, showcasing my work across various languages and innovative ideas. Click on Learn more to explore detailed information about my projects.",
    link: "#",
    accent: true, // Accent color for this card
  },
  {
    title: "My Activities",
    icon: <Award size={36} />,
    img: "/public/activities.png",
    desc: "Hey, welcome to my extracurricular activities and awards section. I have a strong passion for leadership and thrive in management roles. Click on any box to Learn more about my professional experiences and achievements.",
    link: "#",
    accent: false,
  },
];

const Portfolio = () => (
  <section id="portfolio" className="portfolio-section">
    <h2 className="portfolio-title">My Portfolio</h2>
    <div className="portfolio-cards">
      {cards.map((card, i) => (
        <div
          className={`portfolio-card${card.accent ? " accent" : ""}`}
          key={card.title}
        >
          <div className="portfolio-img-wrapper">
            <img src={card.img} alt={card.title} className="portfolio-img" />
          </div>
          <div className="portfolio-icon">{card.icon}</div>
          <h3 className="portfolio-card-title">{card.title}</h3>
          <p className="portfolio-card-desc">{card.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Portfolio;
