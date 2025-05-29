import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, CheckCircle } from "lucide-react";

const ExperienceCard = ({ experience, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // 3D tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXVal = ((y - centerY) / centerY) * -8;
    const rotateYVal = ((x - centerX) / centerX) * 8;
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };
  const handleMouseLeave = () => {
    if (!isFlipped) {
      setRotateX(0);
      setRotateY(0);
    }
  };

  // Framer Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.14 }
    }
  };
  const flipVariants = {
    front: { rotateY: 0, transition: { duration: 0.42, ease: "easeOut" }},
    back: { rotateY: 180, transition: { duration: 0.42, ease: "easeOut" }},
  };

  return (
    <motion.div
      ref={cardRef}
      className="exp-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className="exp-card-inner"
        animate={isFlipped ? "back" : "front"}
        variants={flipVariants}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%" }}
        onClick={() => setIsFlipped((f) => !f)}
        tabIndex={0}
      >
        {/* FRONT */}
        <motion.div
          className="exp-card-front"
          style={{
            transformStyle: "preserve-3d",
            transform: !isFlipped
              ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
              : "",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="exp-card-header">
            <h3 className="exp-card-title">{experience.title}</h3>
            <span className="exp-card-date">
              <Calendar size={16} style={{ marginRight: 6 }} />
              {experience.date}
            </span>
          </div>
          <a
            className="exp-card-company"
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            {experience.company}
          </a>
          <div className="exp-card-desc" style={{ margin: "14px 0 10px 0", color: "#fff" }}>
            {experience.description.length > 220
              ? experience.description.slice(0, 115) + "..."
              : experience.description}
          </div>
          {/* View Details hint */}
          <div style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            width: "auto",
            zIndex: 10,
            display: "flex",
            justifyContent: "center"
            }}>
            <div
                className="exp-view-details-btn"
                style={{
                background: "#ff9800",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15.5,
                borderRadius: 22,
                padding: "9px 36px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 18px rgba(255,152,0,0.14)",
                userSelect: "none",
                pointerEvents: "none", // Makes button unclickable, since whole card flips
                fontFamily: "inherit",
                letterSpacing: 0.04,
                border: "none",
                outline: "none"
                }}
            >
                View Details
                <svg width="19" height="19" style={{ marginLeft: 9 }}>
                <path d="M6 9.5h7M11 7l2.5 2.5-2.5 2.5" stroke="#fff" strokeWidth="2.3" fill="none" strokeLinecap="round" />
                </svg>
            </div>
            </div>
        </motion.div>
        {/* BACK */}
        <motion.div
          className="exp-card-back"
          style={{
            transform: "rotateY(180deg)"
          }}
          onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
        >
          <div className="exp-card-header" style={{ marginBottom: 10 }}>
            <h3 className="exp-card-title">{experience.title}</h3>
            <a
              href={experience.link}
              onClick={e => e.stopPropagation()}
              className="exp-card-external"
              target="_blank"
              rel="noopener noreferrer"
              title="External Link"
              style={{ marginLeft: "auto", color: "#3faaff" }}
            >
              <ExternalLink size={18} />
            </a>
          </div>
          <div className="exp-card-achievements">
            <span
              style={{
                color: "#1e90ff",
                fontWeight: 700,
                fontSize: 15.5,
                display: "inline-flex",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              Key Achievements
            </span>
            <ul className="exp-achieve-list" style={{ margin: 0, padding: 0 }}>
              {experience.achievements.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 7,
                    fontSize: 15.3,
                    fontWeight: 500
                  }}
                >
                  <CheckCircle size={16} style={{ color: "#20c997" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              color: "#3faaff",
              fontSize: 13.2,
              fontWeight: 400,
              marginTop: 20,
              opacity: 0.85,
              letterSpacing: 0.02,
            }}
          >
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;
