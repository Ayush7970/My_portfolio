import React from 'react';
import { Briefcase, Share2, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


  const cards = [
    {
    title: "Work Experience",
    icon: <Briefcase size={36} />,
    img: "/experience.png",
    desc: "Where I ship real features, clean up messy problems, and help teams move faster. Click Learn more to see what I built, improved, and owned end to end.",
    link: "/experience",
    accent: false,
  },
  {
    title: "Personal Projects",
    icon: <Share2 size={36} />,
    img: "/myproject.png",
    desc: "My playground for building, breaking, and shipping again from agentic AI to full stack apps. Click Learn more to explore the projects I’m most proud of.",
    link: "/projects",
    accent: true,
  },
  {
    title: "Beyond the Code",
    icon: <Award size={36} />,
    img: "/activities.png",
    desc: "The human side of my grind mentoring students, leading programs, and collecting wins along the way. Click Learn more to see leadership, awards, and impact.",
    link: "/activities",
    accent: false,
  },
];

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <section id="portfolio" className="portfolio-section">
      <h2 className="portfolio-title">My Portfolio
      <span className="section-title-underline"></span> {/* adding orange line  */}
      </h2>
      <div className="portfolio-cards">
        {cards.map((card) => (
          <div
            className={`portfolio-card${card.accent ? " accent" : ""}`}
            key={card.title}
            onClick={() => navigate(card.link)}
            tabIndex={0}
            role="button"
            onKeyPress={e => { if (e.key === 'Enter') navigate(card.link); }}
            style={{ cursor: 'pointer' }}
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
};


export default Portfolio;
