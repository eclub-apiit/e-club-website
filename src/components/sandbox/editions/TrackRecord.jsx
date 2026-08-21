import { useState, useRef, useEffect, useCallback } from "react";
import editionsData from "./editionsData";

/**
 * TrackRecord — centered section with animated segmented toggle and stat card.
 *
 * When Sandbox 3.0 wraps, update the heading to "Three editions and counting"
 * and add a third entry in editionsData.js — that's a data-file change only.
 *
 * Props:
 *   activeEdition  — current edition id string ("2.0" | "1.0")
 *   onEditionChange — callback when user clicks a tab
 */
export default function TrackRecord({ activeEdition, onEditionChange }) {
  const edition = editionsData.find((e) => e.id === activeEdition) || editionsData[0];

  /* ── Sliding pill refs & state ──────────────────────────────────────────── */
  const containerRef = useRef(null);
  const tabRefs = useRef([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  const measurePill = useCallback(() => {
    const activeIdx = editionsData.findIndex((e) => e.id === activeEdition);
    const btn = tabRefs.current[activeIdx];
    const container = containerRef.current;
    if (!btn || !container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPill({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [activeEdition]);

  // Measure on mount (no animation) and whenever activeEdition changes
  useEffect(() => {
    measurePill();
    // Allow transitions only after first paint
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, [measurePill]);

  // Re-measure on resize
  useEffect(() => {
    window.addEventListener("resize", measurePill);
    return () => window.removeEventListener("resize", measurePill);
  }, [measurePill]);

  return (
    <section className="flex flex-col items-center text-center mb-14">
      {/* 1. Eyebrow */}
      <p
        className="font-display font-semibold uppercase mb-[18px]"
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.3em",
          color: "#14f2db",
        }}
      >
        Our Legacy
      </p>

      {/* 2. Heading */}
      {/* NOTE: When Sandbox 3.0 wraps, change to "Three editions and counting" */}
      <h2
        className="font-display font-bold text-white mb-11"
        style={{
          fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)",
          letterSpacing: "-0.02em",
        }}
      >
        Second edition and counting
      </h2>

      {/* 3. Segmented toggle */}
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Select Sandbox edition"
        className="relative inline-flex gap-1 p-[5px] rounded-full mb-11"
        style={{
          background: "rgba(255,255,255,0.045)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Sliding pill indicator — single moving element */}
        <span
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            top: 5,
            bottom: 5,
            left: pill.left,
            width: pill.width,
            background: "#f4f0f4",
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
            transition: mounted
              ? "transform 0.45s cubic-bezier(0.6, 0.1, 0.15, 1.2), width 0.45s cubic-bezier(0.6, 0.1, 0.15, 1.2), left 0.45s cubic-bezier(0.6, 0.1, 0.15, 1.2)"
              : "none",
          }}
        />

        {editionsData.map((ed, i) => {
          const isActive = ed.id === activeEdition;
          return (
            <button
              key={ed.id}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                if (!isActive) onEditionChange(ed.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const nextIdx =
                    e.key === "ArrowRight"
                      ? (i + 1) % editionsData.length
                      : (i - 1 + editionsData.length) % editionsData.length;
                  onEditionChange(editionsData[nextIdx].id);
                  tabRefs.current[nextIdx]?.focus();
                }
              }}
              className="relative z-10 rounded-full font-semibold font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0447c] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{
                fontSize: "0.95rem",
                padding: "12px 26px",
                background: "transparent",
                color: isActive ? "#161018" : "#cbd3e1",
                transition: mounted
                  ? "color 0.3s ease 0.1s"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = "#cbd3e1";
              }}
            >
              {ed.tabLabel}
            </button>
          );
        })}
      </div>

      {/* 4. Stat card */}
      <div
        className="w-full rounded-[18px]"
        style={{
          maxWidth: 1040,
          background: "#221022",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 24px 50px -28px rgba(0,0,0,0.55)",
        }}
      >
        {/* Three-column grid (stacks on mobile) */}
        <div
          className="track-record-grid"
          style={{ padding: "26px 12px 0" }}
        >
          {/* ── Year ── */}
          <div className="track-record-col" style={{ padding: "2px 24px 20px" }}>
            <div
              className="font-display font-bold text-white flex items-center justify-center"
              style={{
                fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                marginBottom: 8,
                minHeight: "1.9em",
              }}
            >
              {edition.year}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#b3a2b0" }}>Year</div>
          </div>

          {/* ── Champions ── */}
          <div
            className="track-record-col track-record-divider"
            style={{ padding: "2px 24px 20px" }}
          >
            <div
              className="font-display font-bold text-white flex items-center justify-center"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                marginBottom: 8,
                minHeight: "1.9em",
              }}
            >
              {edition.school.todo ? (
                <span className="flex items-center justify-center flex-wrap gap-y-1">
                  <span
                    className="italic font-medium"
                    style={{ color: "#b3a2b0", fontWeight: 500 }}
                  >
                    Champions
                  </span>
                  <span
                    className="font-display font-semibold uppercase inline-flex items-center"
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.14em",
                      color: "#f0c674",
                      background: "rgba(240,198,116,0.1)",
                      border: "1px dashed rgba(240,198,116,0.45)",
                      borderRadius: 6,
                      padding: "3px 7px",
                      marginLeft: 8,
                    }}
                  >
                    TODO
                  </span>
                </span>
              ) : (
                edition.school.name
              )}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#b3a2b0" }}>
              Champions
            </div>
          </div>

          {/* ── Theme ── */}
          <div
            className="track-record-col track-record-divider"
            style={{ padding: "2px 24px 20px" }}
          >
            <div
              className="font-display font-bold italic flex items-center justify-center"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                marginBottom: 8,
                minHeight: "1.9em",
                color: "#e6d9ee",
              }}
            >
              &ldquo;{edition.theme}&rdquo;
            </div>
            <div style={{ fontSize: "0.82rem", color: "#b3a2b0" }}>Theme</div>
          </div>
        </div>

        {/* Footer description */}
        <p
          className="text-center mx-auto"
          style={{
            fontSize: "0.92rem",
            lineHeight: 1.55,
            color: "#c3b4c6",
            maxWidth: "58ch",
            padding: "10px 34px 22px",
          }}
        >
          {edition.description}
        </p>
      </div>

      {/* ── Scoped styles for grid, dividers, and responsive ── */}
      <style>{`
        .track-record-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .track-record-col {
          text-align: center;
          position: relative;
        }
        /* Inset vertical dividers — stop short of card edges */
        .track-record-divider::before {
          content: "";
          position: absolute;
          left: 0;
          top: 2px;
          bottom: 14px;
          width: 1px;
          background: rgba(255, 255, 255, 0.09);
        }

        /* ≤ 820px — stack columns vertically */
        @media (max-width: 820px) {
          .track-record-grid {
            grid-template-columns: 1fr;
          }
          .track-record-col {
            padding: 18px 24px 16px !important;
          }
          /* Swap vertical dividers for horizontal inset dividers */
          .track-record-divider::before {
            top: 0;
            bottom: auto;
            left: 24px;
            right: 24px;
            width: auto;
            height: 1px;
          }
        }

        /* ≤ 560px — tighter spacing only */
        @media (max-width: 560px) {
          .track-record-col {
            padding: 14px 16px 12px !important;
          }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .track-record-col,
          .track-record-divider::before {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
