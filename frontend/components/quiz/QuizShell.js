"use client";
import { useState, useEffect } from "react";
import useCalculatorStore from "../../store/calculatorStore";
import Step1_Age           from "./Step1_Age";
import Step2_Expenses      from "./Step2_Expenses";
import Step3_RetireAge     from "./Step3_RetireAge";
import Step4_Lifestyle     from "./Step4_Lifestyle";
import Step5_CurrentSavings from "./Step5_CurrentSavings";

const STEPS = [
  { label:"Your Age",       Component:Step1_Age },
  { label:"Monthly Spend",  Component:Step2_Expenses },
  { label:"Retire When?",   Component:Step3_RetireAge },
  { label:"Lifestyle",      Component:Step4_Lifestyle },
  { label:"Savings So Far", Component:Step5_CurrentSavings },
];

export default function QuizShell() {
  const { currentStep } = useCalculatorStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const { Component } = STEPS[currentStep];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-ink-light text-sm">Step {currentStep + 1} of {STEPS.length}</span>
          <span className="text-blue-DEFAULT text-sm font-semibold">{STEPS[currentStep].label}</span>
        </div>
        <div className="h-2 bg-blue-tint rounded-full overflow-hidden">
          <div className="h-full bg-blue-DEFAULT rounded-full transition-all duration-400"
            style={{ width:`${((currentStep + 1) / STEPS.length) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-3 px-1">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <div className={`rounded-full transition-all duration-300 ${
                i < currentStep  ? "w-3 h-3 bg-blue-DEFAULT" :
                i === currentStep? "w-4 h-4 bg-blue-DEFAULT ring-4 ring-blue-soft" :
                                   "w-2.5 h-2.5 bg-beige-border"
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* Step content — key forces remount on step change */}
      <div key={currentStep} className="anim-fade-up">
        <Component />
      </div>
    </div>
  );
}
