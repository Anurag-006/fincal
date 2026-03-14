"use client";
import { useState } from "react";
import useCalculatorStore from "../../store/calculatorStore";
import Button from "../ui/Button";
import { EXPENSE_PRESETS } from "../../lib/constants";
import { formatINRFull } from "../../lib/formulas";

export default function Step2_Expenses() {
  const { monthlyExpense, setInput, nextStep, prevStep } = useCalculatorStore();

  // Allow clearing input fully
  const [raw, setRaw] = useState(String(monthlyExpense));
  const numVal = parseInt(raw, 10) || 0;

  const pickPreset = (v) => setRaw(String(v));

  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    setRaw(digits === "" ? "" : String(parseInt(digits, 10) || 0));
  };

  const handleNext = () => {
    setInput("monthlyExpense", Math.max(numVal, 1000));
    nextStep();
  };

  return (
    <div className="card p-8 text-center">
      <h2 className="font-display text-3xl font-bold mb-2 text-ink">
        Monthly expenses?
      </h2>

      <p className="text-ink-light mb-8">
        Include rent, food, bills and lifestyle. Be honest — this shapes your
        entire plan.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {EXPENSE_PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => pickPreset(p.value)}
            className={`p-4 rounded-xl num text-lg font-semibold transition-all border ${
              numVal === p.value
                ? "bg-blue-DEFAULT text-white border-blue-DEFAULT"
                : "bg-blue-soft text-blue-dark border-blue-tint hover:border-blue-DEFAULT hover:bg-blue-tint"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-ink-light text-sm mb-3">
          Or type a custom amount:
        </p>

        {/* Accessible label */}
        <label htmlFor="monthly-expense-input" className="sr-only">
          Monthly expenses in rupees
        </label>

        <div className="flex items-center border-2 border-beige-border focus-within:border-blue-DEFAULT rounded-xl overflow-hidden bg-white transition-colors">
          <span
            className="px-4 text-blue-DEFAULT num font-bold text-xl border-r border-beige-border"
            aria-hidden="true"
          >
            ₹
          </span>

          <input
            id="monthly-expense-input"
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
            placeholder="Enter amount"
            aria-describedby="expense-hint"
            className="flex-1 px-4 py-3 text-xl num text-ink outline-none bg-transparent"
          />

          <span className="px-4 text-ink-light text-sm" aria-hidden="true">
            /month
          </span>
        </div>

        <span id="expense-hint" className="sr-only">
          Enter your total monthly expenses including rent, food, and bills.
        </span>

        {numVal >= 1000 ? (
          <p className="text-blue-DEFAULT num text-sm mt-2">
            Selected: {formatINRFull(numVal)}/month
          </p>
        ) : (
          raw !== "" && (
            <p className="text-red-600 text-sm mt-2">
              Please enter at least ₹1,000/month
            </p>
          )
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={prevStep} className="flex-1">
          ← Back
        </Button>

        <Button
          onClick={handleNext}
          className="flex-1"
          size="lg"
          disabled={numVal < 1000}
        >
          Continue →
        </Button>
      </div>
    </div>
  );
}