"use client";
import { useState } from "react";
import useCalculatorStore from "../../store/calculatorStore";
import Button from "../ui/Button";

export default function Step3_RetireAge() {
  const { currentAge, setInput, nextStep, prevStep } = useCalculatorStore();

  // FIX: local state updates immediately — fixes the "no dynamic selection" bug
  const defaultRetire = Math.max(60, currentAge + 6);
  const [selected, setSelected] = useState(defaultRetire);

  const minAge   = currentAge + 5;
  const maxAge   = 70;
  const yearsLeft = selected - currentAge;
  const retired   = 80 - selected;
  const pct       = ((selected - minAge) / (maxAge - minAge)) * 100;

  const presets = [50, 55, 58, 60, 62, 65].filter(a => a > currentAge + 4 && a <= maxAge);

  const handleNext = () => { setInput("retirementAge", selected); nextStep(); };

  return (
    <div className="card p-8 text-center">
      <div className="text-5xl mb-4" aria-hidden="true"></div>
      <h2 className="font-display text-3xl font-bold mb-2 text-ink">When do you want to retire?</h2>
      <p className="text-ink-light mb-6">The earlier you retire, the more you need to save each month.</p>

      {/* Big age display */}
      <div className="num text-6xl font-bold text-blue-DEFAULT mb-4">Age {selected}</div>

      {/* FIX: Slider for smooth, continuous selection */}
<div className="mb-6 px-2">
  <label htmlFor="retire-age-slider" className="sr-only">
    Retirement age
  </label>
  <input
    id="retire-age-slider"
    type="range"
    min={minAge}
    max={maxAge}
    step={1}
    value={selected}
    onChange={e => setSelected(Number(e.target.value))}
    aria-valuemin={minAge}
    aria-valuemax={maxAge}
    aria-valuenow={selected}
    aria-valuetext={`Age ${selected}`}
    style={{ background: `linear-gradient(to right,#224c87 ${pct}%,#DBEAFE ${pct}%)` }}
    className="w-full"
  />
        <div className="flex justify-between text-xs text-ink-faint mt-1">
          <span>Age {minAge}</span>
          <span>Age {maxAge}</span>
        </div>
      </div>

      {/* Quick preset buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {presets.map(age => (
          <button key={age} onClick={() => setSelected(age)}
            className={`px-4 py-2 rounded-xl num font-semibold text-sm transition-all border ${
              selected === age
                ? "bg-blue-DEFAULT text-white border-blue-DEFAULT"
                : "bg-blue-soft text-blue-dark border-blue-tint hover:border-blue-DEFAULT hover:bg-blue-tint"
            }`}>Age {age}</button>
        ))}
      </div>

      {/* Timeline visual */}
      <div className="card border border-beige-border p-4 mb-6 bg-[var(--bg)] text-left">
        <div className="flex justify-between text-xs text-ink-light mb-2">
          <span>Now (Age {currentAge})</span>
          <span className="text-blue-DEFAULT font-semibold">Retire (Age {selected})</span>
          <span>Age 80</span>
        </div>
        <div className="h-4 bg-blue-tint rounded-full overflow-hidden">
          <div className="h-full bg-blue-DEFAULT rounded-full transition-all duration-300"
            style={{ width:`${(yearsLeft / (80 - currentAge)) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-sm font-semibold">
          <span className="text-blue-DEFAULT">{yearsLeft} years to save</span>
          <span className="text-ink-light">{retired} years in retirement</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={prevStep} className="flex-1">← Back</Button>
        <Button onClick={handleNext} className="flex-1" size="lg">Continue →</Button>
      </div>
    </div>
  );
}
