import React from "react";
import { getInitials, getAvatarColor } from "../utils.js";

/**
 * Clean, professional handcrafted Avatar component.
 * Features:
 * - 100% CSS typography & harmonious color palettes
 * - Zero AI-generated graphics, artificial illustrations, or synthetic faces
 * - Fully responsive with crisp geometric shapes
 */
export default function Avatar({
  name = "User",
  size = "md", // 'sm', 'md', 'lg', 'xl'
  className = "",
}) {
  const initials = getInitials(name);
  const colorStyle = getAvatarColor(name);

  const sizeClasses = {
    sm: "w-7 h-7 text-xs rounded-lg",
    md: "w-9 h-9 text-xs rounded-xl",
    lg: "w-11 h-11 text-sm rounded-xl",
    xl: "w-14 h-14 text-base rounded-2xl",
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`${currentSize} flex items-center justify-center font-bold font-sans tracking-tight shadow-xs shrink-0 select-none ${className}`}
      style={{
        background: colorStyle.bg,
        color: colorStyle.text,
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
      title={name}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
