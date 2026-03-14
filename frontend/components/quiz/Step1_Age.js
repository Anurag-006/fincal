"use client";
import { useState } from "react";
import useCalculatorStore from "../../store/calculatorStore";
import Button from "../ui/Button";
import { AGE_PRESETS } from "../../lib/constants";

export default function Step1_Age() {
  const { currentAge, setInput, nextStep } = useCalculatorStore();
  const [age, setAge] = useState(currentAge);

  const handleNext = () => { setInput("currentAge", age); nextStep(); };

  return (
    <div className="card p-8 text-center">
      <div className="text-5xl mb-4" aria-hidden="true"></div>
      <h2 className="font-display text-3xl font-bold mb-2 text-ink">How old are you?</h2>
      <p className="text-ink-light mb-8">This tells us how many years you have to grow your money.</p>

      {/* +/- stepper — FIX: no ring on click, only hover highlight */}
      <div className="flex items-center justify-center gap-6 mb-8">
<button
  onClick={() => setAge(a => Math.max(18, a - 1))}
  aria-label="Decrease age"
  className="w-12 h-12 rounded-full border border-blue-tint bg-blue-soft text-ink-mid text-2xl
             hover:border-blue-DEFAULT hover:text-white hover:bg-blue-DEFAULT
             transition-all duration-150 focus-visible:outline-2 focus-visible:outline-blue-DEFAULT"
>−</button>

<div
  className="text-7xl num font-bold text-blue-DEFAULT w-28 text-center select-none"
  aria-live="polite"
  aria-atomic="true"
  aria-label={`Current age: ${age}`}
>
  {age}
</div>

<button
  onClick={() => setAge(a => Math.min(55, a + 1))}
  aria-label="Increase age"
  className="w-12 h-12 rounded-full border border-blue-tint bg-blue-soft text-ink-mid text-2xl
             hover:border-blue-DEFAULT hover:text-white hover:bg-blue-DEFAULT
             transition-all duration-150 focus-visible:outline-2 focus-visible:outline-blue-DEFAULT"
>+</button>
      </div>

      {/* Quick presets */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {AGE_PRESETS.map(a => (
          <button key={a} onClick={() => setAge(a)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
              age === a
                ? "bg-blue-DEFAULT text-white border-blue-DEFAULT"
                : "bg-blue-soft text-blue-dark border-blue-tint hover:border-blue-DEFAULT hover:bg-blue-tint"
            }`}>{a}</button>
        ))}
      </div>

      <Button onClick={handleNext} className="w-full" size="lg">Continue →</Button>
    </div>
  );
}
