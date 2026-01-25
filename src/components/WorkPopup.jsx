import React, { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function WorkPopup({
  href = "/current",
  message = "Want to see what I'm currently working on?",
  cta = "View",
  showDelayMs = 700,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), showDelayMs);
    return () => clearTimeout(t);
  }, [showDelayMs]);

  const dismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className="work-popup" role="dialog" aria-label="Current work popup">
      <button
        className="work-popup-close"
        onClick={dismiss}
        aria-label="Close"
        type="button"
      >
        <X size={16} />
      </button>

      <div className="work-popup-content">
        <div className="work-popup-text">{message}</div>

        <Link className="work-popup-btn" to={href}>
          {cta} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
