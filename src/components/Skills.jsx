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

const MOBILE_QUERY = "(max-width: 640px)";
const MOBILE_DEFAULT_COUNT = 10;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const sectionRef = useRef(null);

  // Filter skills based on category
  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  // Determine which skills to display (mobile caps at 10 unless expanded)
  const visibleSkills = isMobile
    ? (showAllMobile ? filteredSkills : filteredSkills.slice(0, MOBILE_DEFAULT_COUNT))
    : filteredSkills;

  // For desktop: split into 2 columns
  const mid = Math.ceil(visibleSkills.length / 2);
  const leftSkills = visibleSkills.slice(0, mid);
  const rightSkills = visibleSkills.slice(mid);

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

  // Track mobile viewport with matchMedia
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Reset mobile "show more" when category changes
  useEffect(() => {
    setShowAllMobile(false);
  }, [activeCategory]);

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
              aria-pressed={activeCategory === cat.key}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="skills-bars-grid">
          {isMobile ? (
            // MOBILE: single column
            <div className="skills-bars-col">
              {visibleSkills.map((skill, i) => (
                <div className="skill-bar-item" key={`${skill.name}-${i}`}>
                  <div className="skill-bar-labels">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="progress-bar" role="progressbar"
                       aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
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

              {/* Show More/Less only on mobile and only if more than 10 exist */}
              {filteredSkills.length > MOBILE_DEFAULT_COUNT && (
                <button
                  type="button"
                  className="more-btn"
                  onClick={() => setShowAllMobile((v) => !v)}
                  aria-expanded={showAllMobile}
                  aria-controls="skills"
                >
                  {showAllMobile ? "Show Less" : `Show More (${filteredSkills.length - MOBILE_DEFAULT_COUNT})`}
                </button>
              )}
            </div>
          ) : (
            // DESKTOP/TABLET: two columns
            <>
              <div className="skills-bars-col">
                {leftSkills.map((skill, i) => (
                  <div className="skill-bar-item" key={`${skill.name}-L-${i}`}>
                    <div className="skill-bar-labels">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="progress-bar" role="progressbar"
                         aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
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
              <div className="skills-bars-col">
                {rightSkills.map((skill, i) => (
                  <div className="skill-bar-item" key={`${skill.name}-R-${i}`}>
                    <div className="skill-bar-labels">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="progress-bar" role="progressbar"
                         aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: isVisible ? `${skill.level}%` : 0,
                          transitionDelay: isVisible ? `${(i + leftSkills.length) * 100}ms` : "0ms",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
