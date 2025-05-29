import React, { useState } from "react";

export default function TechCarousel({ tags }) {
  const VISIBLE = 3; // Show 3 tags at a time (adjust as needed)
  const [start, setStart] = useState(0);

  // Show/hide arrows
  const showLeft = start > 0;
  const showRight = start + VISIBLE < tags.length;

  const handleLeft = (e) => {
    e.stopPropagation();
    setStart((prev) => Math.max(prev - 1, 0));
  };
  const handleRight = (e) => {
    e.stopPropagation();
    setStart((prev) => Math.min(prev + 1, tags.length - VISIBLE));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 17,
        marginTop: 2,
        minHeight: 36,
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      {/* Left Arrow */}
      {tags.length > VISIBLE && (
        <button
          onClick={handleLeft}
          disabled={!showLeft}
          aria-label="Scroll left"
          style={{
            background: "none",
            border: "none",
            color: showLeft ? "#3faaff" : "#2c3444",
            fontSize: 20,
            cursor: showLeft ? "pointer" : "not-allowed",
            padding: "0 7px",
            marginRight: 2,
            opacity: showLeft ? 1 : 0.4,
            userSelect: "none",
          }}
        >
          &#60;
        </button>
      )}

      {/* Tag pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflow: "hidden",
          flex: `0 0 ${VISIBLE * 90}px`,
        }}
      >
        {tags.slice(start, start + VISIBLE).map((tag, idx) => (
          <span
            key={tag}
            style={{
              background: "#151820",
              color: "#e3e7ed",
              padding: "6px 10px",
              fontSize: 12,
              borderRadius: 17,
              fontWeight: 600,
              letterSpacing: 0.05,
              whiteSpace: "nowrap",
              minWidth: 60,
              textAlign: "center",
              transition: "background 0.13s",
              boxShadow: "0 1.5px 8px 0 rgba(20,30,50,0.09)",
              border: "none",
              outline: "none",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Right Arrow */}
      {tags.length > VISIBLE && (
        <button
          onClick={handleRight}
          disabled={!showRight}
          aria-label="Scroll right"
          style={{
            background: "none",
            border: "none",
            color: showRight ? "#3faaff" : "#2c3444",
            fontSize: 20,
            cursor: showRight ? "pointer" : "not-allowed",
            padding: "0 7px",
            marginLeft: 2,
            opacity: showRight ? 1 : 0.4,
            userSelect: "none",
          }}
        >
          &#62;
        </button>
      )}
    </div>
  );
}
