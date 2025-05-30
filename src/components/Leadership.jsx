import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const leadershipData = [
  {
    title: "Orientation Leader, New Student & Family Programs",
    description: `Led group sessions and managed registration for 6,000+ new UIC students, delivering speeches and supporting advisors. Helped boost student engagement and ensured smooth academic transitions.`,
    image: "/leadership1.png",
  },
  {
    title: "Computer Science Ambassador",
    description: `Represented UIC CS for the Summer Bridge Program, delivering talks and guiding new students. Fostered a welcoming and supportive environment for all participants.`,
    image: "/leadership2.png",
  },
  {
    title: "Peer Academic Advisor",
    description: `Guided students on course planning, registration, and graduation goals. Supported peers across departments for informed academic decisions and smoother transitions.`,
    image: "/peeradvisor.png",
  },
  {
    title: "Dean’s List Scholar & Academic Excellence",
    description: `Consistently named to UIC’s Dean’s List (top 5%) for strong academics and GPA. Balanced challenging CS courses with campus leadership and activities.`,
    image: "/Ayush_headshot_orientation.png",
  },
  {
  title: "CodePath Technical Interview Prep Graduate",
  description: `Successfully completed CodePath’s Intermediate Technical Interview Prep (Spring 2025), sharpening skills in algorithms and problem-solving. Collaborated with peers, built strong technical foundations, and expanded my professional network.`,
  image: "/codepath_certificate.png",
  }
];



function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

export default function Leadership3DSlider() {
  const [index, setIndex] = useState(0);

  // Indices for visible slides
  const prevIndex = wrapIndex(index - 1, leadershipData.length);
  const nextIndex = wrapIndex(index + 1, leadershipData.length);

  const goPrev = () => setIndex(prevIndex);
  const goNext = () => setIndex(nextIndex);

  return (
    <section className="leadership-3d-slider">
      <div className="slider-container">
        {/* Images Container */}
        <div className="images-wrapper">
          {/* Left Image */}
          <motion.img
            key={prevIndex}
            src={leadershipData[prevIndex].image}
            alt={leadershipData[prevIndex].title}
            className="slider-image left"
            initial={{ opacity: 0, scale: 0.7, rotateY: 45, x: -150 }}
            animate={{ opacity: 0.4, scale: 0.8, rotateY: 45, x: -120 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            aria-hidden="true"
          />
          {/* Center Image */}
          <motion.img
            key={index}
            src={leadershipData[index].image}
            alt={leadershipData[index].title}
            className="slider-image center"
            initial={{ opacity: 0, scale: 0.8, rotateY: 0, x: 0 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            aria-label={`Current leadership: ${leadershipData[index].title}`}
          />
          {/* Right Image */}
          <motion.img
            key={nextIndex}
            src={leadershipData[nextIndex].image}
            alt={leadershipData[nextIndex].title}
            className="slider-image right"
            initial={{ opacity: 0, scale: 0.7, rotateY: -45, x: 150 }}
            animate={{ opacity: 0.4, scale: 0.8, rotateY: -45, x: 120 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            aria-hidden="true"
          />
        </div>

        {/* Description Box */}
        <div className="slider-description">
          <h2>{leadershipData[index].title}</h2>
          <p>{leadershipData[index].description}</p>
        </div>

        {/* Navigation Buttons */}
        <button
          aria-label="Previous leadership"
          className="slider-nav prev"
          onClick={goPrev}
        >
          <ChevronLeft size={44} />
        </button>
        <button
          aria-label="Next leadership"
          className="slider-nav next"
          onClick={goNext}
        >
          <ChevronRight size={44} />
        </button>

        {/* Dots */}
        <div className="slider-dots" role="tablist" aria-label="Leadership slider pagination">
          {leadershipData.map((_, i) => (
            <button
              key={i}
              className={`slider-dot${i === index ? " active" : ""}`}
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
