import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { hackathonPhotos } from "../data/hackathonPhotos";

const VISIBLE = 3; // Center + sides

function wrap(idx, len) {
  return ((idx % len) + len) % len;
}

export default function HackathonCarousel() {
  const [current, setCurrent] = useState(0);
  const n = hackathonPhotos.length;

  const getClass = (i) => {
    if (i === current) return "active";
    if (i === wrap(current - 1, n)) return "left";
    if (i === wrap(current + 1, n)) return "right";
    return "hidden";
  };

  const prev = () => setCurrent((c) => wrap(c - 1, n));
  const next = () => setCurrent((c) => wrap(c + 1, n));

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">Hackathon Gallery</h2>
      <span className="carousel-section-underline"></span>
      <div className="carousel-container">
        <button className="carousel-arrow left" onClick={prev} aria-label="Previous">
          <ChevronLeft size={38} />
        </button>
        <div className="carousel-track">
          {hackathonPhotos.map((item, i) => (
            <div className={`carousel-card ${getClass(i)}`} key={i}>
              <img className="carousel-img" src={item.image} alt={item.title} />
              <h3 className="carousel-card-title">{item.title}</h3>
              <div className="carousel-location">{item.location}</div>
            </div>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={next} aria-label="Next">
          <ChevronRight size={38} />
        </button>
      </div>
      <div className="carousel-dots">
        {hackathonPhotos.map((_, i) => (
          <span
            key={i}
            className={`carousel-dot${i === current ? " active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}
