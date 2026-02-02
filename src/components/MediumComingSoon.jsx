import React from "react";
import { ArrowLeft, PenSquare } from "lucide-react";
import "../styles/MediumComingSoon.css";

const MediumComingSoon = () => {
  const goBack = () => window.history.back();

  return (
    <main className="comingsoon-page">
      <div className="comingsoon-card">
        <div className="comingsoon-badge">Coming Soon</div>

        <div className="comingsoon-icon">
          <PenSquare size={22} />
        </div>

        <h1 className="comingsoon-title">Medium Articles</h1>

        <p className="comingsoon-text">
          I’m currently writing practical engineering articles on agentic AI,
          scalable backend systems, and lessons learned while shipping projects.
          This page will be live soon — feel free to check back in a few days.
        </p>

        <div className="comingsoon-actions">
          <button className="comingsoon-back" onClick={goBack}>
            <ArrowLeft size={18} />
            Back
          </button>

          <a className="comingsoon-home" href="/">
            Home
          </a>
        </div>
      </div>
    </main>
  );
};

export default MediumComingSoon;
