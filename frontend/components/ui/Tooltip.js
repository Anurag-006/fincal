"use client";
import { useState, useId } from "react";

export default function Tooltip({ children, content }) {
  const [show, setShow] = useState(false);
  const uid = useId(); // unique id for accessibility

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // prevent scrolling for space key
      setShow((s) => !s);
    }
  };

  return (
    <span className="relative inline-block">
      <span
        className="cursor-help border-b border-dashed border-blue-light text-blue-DEFAULT"
        role="button"
        tabIndex={0}
        aria-describedby={uid}
        aria-expanded={show}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onKeyDown={handleKeyDown}
      >
        {children}
      </span>

      {show && (
        <span
          id={uid}
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 text-sm text-ink-mid bg-white border border-beige-border rounded-xl shadow-lg"
        >
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
        </span>
      )}
    </span>
  );
}