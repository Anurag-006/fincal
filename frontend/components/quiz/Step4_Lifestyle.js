"use client";
import { useState } from "react";
import useCalculatorStore from "../../store/calculatorStore";
import Button from "../ui/Button";
import { LIFESTYLE } from "../../lib/constants";

const OPTIONS = [
  { key:"king",   emoji:"", border:"border-yellow-400",  bg:"bg-yellow-50",   text:"text-yellow-800", cbg:"bg-yellow-400" },
  { key:"normal", emoji:"", border:"border-blue-DEFAULT", bg:"bg-blue-soft",  text:"text-blue-dark", cbg:"bg-blue-DEFAULT" },
  { key:"monk",   emoji:"", border:"border-green-500",   bg:"bg-green-50",    text:"text-green-800", cbg:"bg-green-500" },
];

export default function Step4_Lifestyle() {
  const { lifestyle, setInput, nextStep, prevStep } = useCalculatorStore();
  const [selected, setSelected] = useState(lifestyle);

  return (
    <div className="card p-8 text-center">
      <div className="text-5xl mb-4" aria-hidden="true"></div>
      <h2 className="font-display text-3xl font-bold mb-2 text-ink">What kind of retirement?</h2>
      <p className="text-ink-light mb-8">How do you picture your post-retirement life?</p>

      <div className="space-y-3 mb-8">
        {OPTIONS.map(({ key, emoji, border, bg, text, cbg }) => {
          const lf = LIFESTYLE[key];
          const isSelected = selected === key;
          return (
<button
  key={key}
  onClick={() => setSelected(key)}
  aria-pressed={isSelected}
  aria-label={`${lf.label} — ${lf.desc}`}
  className={`w-full p-5 rounded-xl text-left transition-all border-2 ${
    isSelected ? `${border} ${bg}` : "border-blue-tint bg-blue-soft hover:border-blue-DEFAULT"
  }`}
>
              <div className="flex items-center gap-4">
                <span className="text-3xl" aria-hidden="true">{emoji}</span>
                <div className="flex-1">
                  <div className={`font-semibold text-base ${isSelected ? text : "text-blue-dark"}`}>{lf.label}</div>
                  <div className="text-blue-dark text-sm mt-0.5">{lf.desc}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? `${border} ${cbg}` : "border-blue-tint bg-blue-soft"
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={prevStep} className="flex-1">← Back</Button>
        <Button onClick={() => { setInput("lifestyle", selected); nextStep(); }} className="flex-1" size="lg">Continue →</Button>
      </div>
    </div>
  );
}
