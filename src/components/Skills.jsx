import React, { useState, useEffect, useRef } from "react";

const SKILLS = [
  // Languages
  { name: "JavaScript", level: 90, category: "language" },
  { name: "TypeScript", level: 85, category: "language" },
  { name: "Python", level: 90, category: "language" },
  { name: "Java", level: 80, category: "language" },
  { name: "C++", level: 75, category: "language" },
  { name: "Golang", level: 70, category: "language" },
  { name: "HTML/CSS", level: 95, category: "language" },
  { name: "SQL", level: 85, category: "language" },

  // Frameworks
  { name: "React", level: 90, category: "framework" },
  { name: "Angular", level: 80, category: "framework" },
  { name: "Django", level: 85, category: "framework" },
  { name: "TensorFlow", level: 75, category: "framework" },
  { name: "Node.js", level: 85, category: "framework" },

  // Tools
  { name: "Docker", level: 80, category: "tool" },
  { name: "AWS", level: 75, category: "tool" },
  { name: "GCP", level: 80, category: "tool" },
  { name: "Git", level: 90, category: "tool" },
  { name: "MySQL", level: 85, category: "tool" },
];

const CATEGORIES = [
  { key: "all", label: "All Skills" },
  { key: "language", label: "Languages" },
  { key: "framework", label: "Frameworks" },
  { key: "tool", label: "Tools" },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Filter skills based on category
  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  // Split into 2 columns for desktop
  const mid = Math.ceil(filteredSkills.length / 2);
  const leftSkills = filteredSkills.slice(0, mid);
  const rightSkills = filteredSkills.slice(mid);

  // Animate on scroll into view
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.18 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section skills-section">
      <div className="container">
        <div className="section-title">
          <h2>Skills</h2>
          <span className="skills-section-title-underline"></span>
          
        </div>

        <div className="skills-filter">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`filter-btn${activeCategory === cat.key ? " active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="skills-bars-grid">
          {[leftSkills, rightSkills].map((col, colIdx) => (
            <div className="skills-bars-col" key={colIdx}>
              {col.map((skill, i) => (
                <div className="skill-bar-item" key={skill.name}>
                  <div className="skill-bar-labels">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: isVisible ? `${skill.level}%` : 0,
                        transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
