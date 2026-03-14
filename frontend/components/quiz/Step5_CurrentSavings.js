"use client";
import { useState } from "react";
import useCalculatorStore from "../../store/calculatorStore";
import Button from "../ui/Button";
import { SAVINGS_PRESETS } from "../../lib/constants";
import { formatINRFull } from "../../lib/formulas";

export default function Step5_CurrentSavings() {
  const { setInput, nextStep, prevStep } = useCalculatorStore();

  // Allow user to clear and retype
  const [raw, setRaw] = useState("0");
  const numVal = parseInt(raw, 10) || 0;

  const pickPreset = (v) => setRaw(v === 0 ? "0" : String(v));

  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    setRaw(digits === "" ? "" : String(parseInt(digits, 10) || 0));
  };

  const handleNext = () => {
    setInput("existingSavings", numVal);
    nextStep();
  };

  return (
    <div className="card p-8 text-center">
      <h2 className="font-display text-3xl font-bold mb-2 text-ink">
        Any savings so far?
      </h2>

      <p className="text-ink-light mb-2">
        Include PPF, FD, mutual funds, EPF — anything already saved for retirement.
      </p>

      <p className="text-ink-faint text-sm mb-6">
        (Starting fresh? Select "None yet" — that's completely fine!)
      </p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {SAVINGS_PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => pickPreset(p.value)}
            className={`p-3 rounded-xl num font-semibold text-sm transition-all border ${
              numVal === p.value
                ? "bg-blue-DEFAULT text-white border-blue-DEFAULT"
                : "bg-blue-soft text-blue-dark border-blue-tint hover:border-blue-DEFAULT hover:bg-blue-tint"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mb-4">

        <label htmlFor="existing-savings-input" className="sr-only">
          Existing savings in rupees
        </label>

        <div className="flex items-center border-2 border-beige-border focus-within:border-blue-DEFAULT rounded-xl overflow-hidden bg-white transition-colors">
          <span
            className="px-4 text-blue-DEFAULT num font-bold text-xl border-r border-beige-border"
            aria-hidden="true"
          >
            ₹
          </span>

          <input
            id="existing-savings-input"
            type="text"
            inputMode="numeric"
            value={raw}
            onChange={handleChange}
            onFocus={(e) => {
              if (raw === "0") setRaw("");
              e.target.select();
            }}
            onBlur={() => {
              if (!raw) setRaw("0");
            }}
            aria-describedby="savings-hint"
            className="flex-1 px-4 py-3 text-xl num text-ink outline-none bg-transparent"
          />
        </div>

        <span id="savings-hint" className="sr-only">
          Include PPF, FD, mutual funds, EPF and any other retirement savings.
        </span>

        {numVal > 0 && (
          <p className="text-green-700 text-sm mt-2 font-medium">
            ✅ Great start! {formatINRFull(numVal)} already working for you.
          </p>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <Button variant="ghost" onClick={prevStep} className="flex-1">
          ← Back
        </Button>

        <Button onClick={handleNext} className="flex-1" size="lg">
          See My Plan
        </Button>
      </div>
    </div>
  );
}