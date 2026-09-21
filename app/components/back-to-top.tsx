"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_SCROLL = 600;

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_SCROLL);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      type="button"
      className="back-to-top"
      data-visible={isVisible}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 13V3m0 0L3.5 7.5M8 3l4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="screen-reader-only">Kembali ke atas</span>
    </button>
  );
}
