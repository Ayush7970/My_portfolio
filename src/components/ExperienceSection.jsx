import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { experienceData } from "../data/experienceData";
import { TypeAnimation } from 'react-type-animation';


const ExperienceSection = () => (
  <section className="exp-section cosmic">
    <div className="exp-header cosmic">
      <h2 className="gradient-text cosmic">Professional Experience</h2>
      <span className="exp-section-underline"></span>
      <div className="exp-typing">
    <TypeAnimation
      sequence={[
        'Leading teams, driving initiatives, and creating meaningful impact.',
        1800,
        '',
        500,
        'Delivering solutions that empower teams and drive innovation.',
        1800,
        '',
        500,
        'Building a culture of excellence through hands-on leadership.',
        1800,
        '',
        500,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      cursor={true}
    />
  </div>
    </div>
    <div className="exp-grid cosmic">
      {experienceData.map((experience, i) => (
        <ExperienceCard key={experience.id} experience={experience} index={i} />
      ))}
    </div>
    {/* Cosmic background blobs */}
    <div className="cosmic-blob cosmic-blob1"></div>
    <div className="cosmic-blob cosmic-blob2"></div>
  </section>
);

export default ExperienceSection;
