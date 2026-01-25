import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { experienceData } from "../data/experienceData";
import { TypeAnimation } from "react-type-animation";

const ExperienceSection = () => {
  return (
    <section className="exp-section exp-theme cosmic" id="experience">
      {/* Background layers (we’ll style these in CSS next) */}
      <div className="exp-bg" aria-hidden="true">
        <div className="exp-bg-grid" />
        <div className="exp-bg-glow exp-bg-glow-1" />
        <div className="exp-bg-glow exp-bg-glow-2" />
      </div>

      <div className="exp-container">
        <header className="exp-header">
          <motion.h2
            className="exp-title"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Professional Experience
          </motion.h2>

          <motion.span
            className="exp-section-underline"
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />

          <div className="exp-typing">
            <TypeAnimation
              sequence={[
                "Leading teams, driving initiatives, and creating meaningful impact.",
                1800,
                "",
                500,
                "Delivering solutions that empower teams and drive innovation.",
                1800,
                "",
                500,
                "Building a culture of excellence through hands-on leadership.",
                1800,
                "",
                500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
            />
          </div>
        </header>

        <div className="exp-grid">
          {experienceData.map((experience, i) => (
            <ExperienceCard key={experience.id} experience={experience} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
