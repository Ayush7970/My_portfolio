import React, { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "../styles/WorkPopup.css";

export default function WorkPopup({
  href = "/current",
  message = "Want to see what I'm currently working on?",
  cta = "View",
  showDelayMs = 700,
}) {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), showDelayMs);
    return () => clearTimeout(t);
  }, [showDelayMs]);

  const dismiss = () => setVisible(false);

  // Optional: don’t show it on the page it links to
  if (!visible || pathname === href) return null;

  return (
    <div className="work-popup" role="dialog" aria-label="Current work popup">
      <div className="work-popup-content">
        <button
          className="work-popup-close"
          type="button"
          aria-label="Close"
          onClick={(e) => {
            e.preventDefault();      // prevents any default behavior
            e.stopPropagation();     // prevents bubbling to parent clicks
            dismiss();
          }}
        >
          <X size={16} />
        </button>

        <div className="work-popup-text">{message}</div>

        <Link
          className="work-popup-btn"
          to={href}
          onClick={(e) => e.stopPropagation()} // extra safety
        >
          {cta} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
