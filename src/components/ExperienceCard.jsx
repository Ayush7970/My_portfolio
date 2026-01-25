import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, CheckCircle, ArrowUpRight } from "lucide-react";

const ExperienceCard = ({ experience, index }) => {
  const [open, setOpen] = useState(false);

  const openBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);

  // Close on ESC + basic focus trap when modal is open
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);

      // Focus trap inside dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus close button on open
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Return focus to the trigger button on close
  useEffect(() => {
    if (!open) openBtnRef.current?.focus();
  }, [open]);

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 26 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: index * 0.12, ease: "easeOut" },
      },
    }),
    [index]
  );

  const shortDescription =
    typeof experience.description === "string" && experience.description.trim().length
      ? experience.description.trim()
      : "";

  const achievementCount =
    Array.isArray(experience.achievements) ? experience.achievements.length : 0;

  return (
    <>
      {/* CARD */}
      <motion.article
        className="exp-card"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{
          y: -10,
          scale: 1.01,
          transition: { duration: 0.22, ease: "easeOut" },
        }}
      >
        {/* Decorative layers for CSS (glow/border) */}
        <div className="exp-card-glow" aria-hidden="true" />
        <div className="exp-card-border" aria-hidden="true" />

        <header className="exp-card-header">
        <h3 className="exp-card-title">{experience.title}</h3>

        <div className="exp-card-meta">
          <span className="exp-card-date">
            <Calendar size={16} />
            {experience.date}
          </span>

          {experience.company ? (
            <span className="exp-card-company">{experience.company}</span>
          ) : null}
        </div>
      </header>


        {/* Optional preview text (CSS will clamp nicely later) */}
        {shortDescription ? (
          <p className="exp-card-preview">{shortDescription}</p>
        ) : (
          <p className="exp-card-preview exp-card-preview--muted">
            Highlights and impact details inside.
          </p>
        )}

        <div className="exp-card-footer">
          {achievementCount > 0 ? (
            <span className="exp-card-badge">{achievementCount} highlights</span>
          ) : (
            <span className="exp-card-badge exp-card-badge--subtle">Details inside</span>
          )}

          <motion.button
            ref={openBtnRef}
            type="button"
            className="exp-cta-btn"
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.98 }}
          >
            <span>Explore More</span>
            <ArrowUpRight size={18} />
          </motion.button>
        </div>
      </motion.article>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="exp-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              ref={dialogRef}
              className="exp-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${experience.title} details`}
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.985 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="exp-modal-topline" aria-hidden="true" />

              {/* HEADER */}
              <div className="exp-modal-header">
                <div className="exp-modal-heading">
                  <div className="exp-modal-title-row">
                    <h2 className="exp-modal-title">{experience.title}</h2>
                    <span className="exp-modal-pill">
                      <Calendar size={14} />
                      {experience.date}
                    </span>
                  </div>

                  {experience.company ? (
                    <div className="exp-modal-company">{experience.company}</div>
                  ) : null}
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  className="exp-modal-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* BODY */}
              <div className="exp-modal-body">
                {experience.description ? (
                  <section className="exp-modal-section">
                    <div className="exp-modal-section-title">Overview</div>
                    <p className="exp-modal-text">{experience.description}</p>
                  </section>
                ) : null}

                {Array.isArray(experience.achievements) && experience.achievements.length > 0 ? (
                  <section className="exp-modal-section">
                    <div className="exp-modal-section-title">Key achievements</div>
                    <ul className="exp-modal-list">
                      {experience.achievements.map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle size={18} className="exp-check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                <div className="exp-modal-actions">
                  <button
                    type="button"
                    className="exp-modal-secondary"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceCard;
