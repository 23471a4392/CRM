import React from "react";

/**
 * Manually crafted, minimalist vector SVG illustrations.
 * Zero AI generation, clean geometric line-art styled for financial ledger software.
 */
export default function EmptyStateIllustration({ type = "ledger", className = "" }) {
  if (type === "contacts") {
    return (
      <svg
        className={`w-20 h-20 mx-auto ${className}`}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Archival Card Tray */}
        <rect x="14" y="24" width="52" height="42" rx="4" stroke="var(--border)" strokeWidth="2" fill="var(--surface-2)" />
        <path d="M14 36H66" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Rolodex Tab */}
        <path d="M22 24V18C22 16.8954 22.8954 16 24 16H38C39.1046 16 40 16.8954 40 18V24" stroke="var(--accent)" strokeWidth="2" fill="var(--surface-3)" />
        {/* Person silhouette */}
        <circle cx="40" cy="46" r="6" stroke="var(--accent)" strokeWidth="2" />
        <path d="M30 60C30 54.4772 34.4772 50 40 50C45.5228 50 50 54.4772 50 60" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "deals") {
    return (
      <svg
        className={`w-20 h-20 mx-auto ${className}`}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Pipeline Funnel */}
        <path
          d="M16 20H64L48 44V60L32 64V44L16 20Z"
          stroke="var(--border)"
          strokeWidth="2"
          fill="var(--surface-2)"
          strokeLinejoin="round"
        />
        {/* Coin / Value indicator */}
        <circle cx="40" cy="22" r="8" stroke="var(--accent)" strokeWidth="2" fill="var(--surface)" />
        <text x="40" y="26" textAnchor="middle" fill="var(--accent)" fontSize="10" fontWeight="bold" fontFamily="monospace">$</text>
        <path d="M28 32H52" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    );
  }

  if (type === "activities") {
    return (
      <svg
        className={`w-20 h-20 mx-auto ${className}`}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Clipboard */}
        <rect x="18" y="18" width="44" height="50" rx="4" stroke="var(--border)" strokeWidth="2" fill="var(--surface-2)" />
        <rect x="30" y="12" width="20" height="8" rx="2" stroke="var(--accent)" strokeWidth="2" fill="var(--surface-3)" />
        {/* Checklist lines with checkmarks */}
        <path d="M26 32L29 35L36 28" stroke="var(--positive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="42" y1="32" x2="54" y2="32" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 44L29 47L36 40" stroke="var(--positive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="42" y1="44" x2="54" y2="44" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="31" cy="56" r="3" stroke="var(--text-dim)" strokeWidth="1.5" />
        <line x1="42" y1="56" x2="54" y2="56" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Default: Classic Accounting Ledger Book
  return (
    <svg
      className={`w-20 h-20 mx-auto ${className}`}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="16" y="16" width="48" height="52" rx="3" stroke="var(--border)" strokeWidth="2" fill="var(--surface-2)" />
      <line x1="26" y1="16" x2="26" y2="68" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="32" y1="28" x2="56" y2="28" stroke="var(--border)" strokeWidth="1.5" />
      <line x1="32" y1="38" x2="56" y2="38" stroke="var(--border)" strokeWidth="1.5" />
      <line x1="32" y1="48" x2="56" y2="48" stroke="var(--border)" strokeWidth="1.5" />
      {/* Quill / Pen */}
      <path d="M58 20L64 14L68 18L62 24L58 20Z" stroke="var(--accent)" strokeWidth="1.5" fill="var(--surface)" />
      <path d="M58 20L54 30L62 24" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  );
}
