import React from "react";
import { ExternalLink, Github, Play, ArrowRight } from "lucide-react";
import "../styles/CurrentPage.css";

export default function CurrentPage() {
  // Replace these URLs later
  const YOUTUBE_URL = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID";
  const YOUTUBE_THUMB =
    "https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg";

  const CLIENT_REPO = "https://github.com/Ayush7970/Rag_System_project_web_v1";
  const SERVER_REPO = "https://github.com/Ayush7970/RAG_system_project_server";

  return (
    <section className="current-section current-theme">
      {/* Background layers */}
      <div className="current-bg">
        <div className="current-bg-grid" />
        <div className="current-bg-glow current-bg-glow-1" />
        <div className="current-bg-glow current-bg-glow-2" />
      </div>

      <div className="current-container">
        {/* Header */}
        <header className="current-header">
          <h1 className="current-title">Enterprise Agentic Portal</h1>
          <div className="current-subtitle">Data Augmented Generation</div>
          <span className="current-underline" />
          <p className="current-lede">
            A graph-driven, multi-agent RAG system built for scalable retrieval,
            orchestration, and production deployment.
          </p>
        </header>

        {/* Main content */}
        <div className="current-grid">
          {/* Left: Video card */}
          <article className="current-card current-card--video">
            <div className="current-card-top">
              <div className="current-card-kicker">Demo</div>
              <a
                className="current-card-link"
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on YouTube <ExternalLink size={16} />
              </a>
            </div>

            <a
              className="current-video"
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open YouTube demo"
            >
              <img
                className="current-video-thumb"
                src={YOUTUBE_THUMB}
                alt="Enterprise Agentic Portal demo thumbnail"
                loading="lazy"
                decoding="async"
              />
              <div className="current-video-overlay" />
              <div className="current-video-play">
                <Play size={22} />
              </div>
              <div className="current-video-caption">
                Watch the demo walkthrough
                <span className="current-video-caption-arrow">
                  <ArrowRight size={16} />
                </span>
              </div>
            </a>
          </article>

          {/* Right: Repo + bullets */}
          <aside className="current-stack">
            {/* Repo card */}
            <article className="current-card">
              <div className="current-card-top">
                <div className="current-card-kicker">Code</div>
                <div className="current-chip">
                  <Github size={16} /> GitHub
                </div>
              </div>

              <h2 className="current-card-title">Repositories</h2>
              <p className="current-card-desc">
                Two repos for clean separation of concerns: frontend client and
                backend services.
              </p>

              <div className="current-repo-actions">
                <a
                  className="current-btn current-btn--primary"
                  href={CLIENT_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Client Repo <ExternalLink size={16} />
                </a>
                <a
                  className="current-btn current-btn--ghost"
                  href={SERVER_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Server Repo <ExternalLink size={16} />
                </a>
              </div>
            </article>

            {/* Highlights card */}
            <article className="current-card">
              <div className="current-card-top">
                <div className="current-card-kicker">Highlights</div>
                <div className="current-chip current-chip--gold">
                  January 2026
                </div>
              </div>

              <h2 className="current-card-title">
                What this project delivers
              </h2>

              <ul className="current-list">
                <li>
                  Built a graph-driven RAG software with multi-agent orchestration
                  using LangGraph, LangChain, and LangSmith.
                </li>
                <li>
                  Implemented hybrid search retrieval with Celery and Redis for
                  high-throughput asynchronous document ingestion.
                </li>
                <li>
                  Deployed on AWS using ECS on EC2 behind an Application Load
                  Balancer to improve scalability and reliability.
                </li>
              </ul>
            </article>
          </aside>
        </div>

        {/* Footer note (for future sections) */}
        <div className="current-footer-note">
          Next: system design, architecture diagram, and evaluation metrics will
          be added here.
        </div>
      </div>
    </section>
  );
}
