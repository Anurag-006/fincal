"use client";
export default function Slider({ label, value, min, max, step = 1, onChange, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  // Derive a stable id from the label text
  const id = "slider-" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-sm text-ink-light font-body">
          {label}
        </label>
        <span
          className="font-mono text-blue-DEFAULT font-bold text-base"
          aria-live="polite"
          aria-atomic="true"
        >
          {format ? format(value) : value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={format ? format(value) : String(value)}
        style={{ background: `linear-gradient(to right,#224c87 ${pct}%,#DBEAFE ${pct}%)` }}
        className="w-full"
      />
      <div className="flex justify-between mt-1" aria-hidden="true">
        <span className="text-xs text-ink-faint">{format ? format(min) : min}</span>
        <span className="text-xs text-ink-faint">{format ? format(max) : max}</span>
      </div>
    </div>
  );
}