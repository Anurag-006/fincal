"use client";
import { useState } from "react";
import { formatINR } from "../../lib/formulas";

/**
 * FIX — complete rewrite of toggle.
 * The toggle is 100% local state (no store dependency).
 * OFF = nominal: what your SIP corpus will actually read in future rupees
 * ON  = real: that same corpus expressed in today's purchasing power
 *             = nominal ÷ (1 + inflation)^years  ← always a smaller number
 */
export default function InflationToggle({
  nominalSipCorpus,     // future money value of your SIP at retirement
  realSipCorpus,        // today's money equivalent of that corpus
  monthlyExpenseNow,    // current monthly expense (today's money)
  futureMonthlyExpense, // monthly expense at retirement (inflated)
}) {
  const [showReal, setShowReal] = useState(false);

  const toggle = () => setShowReal(prev => !prev);

  const corpusDisplay  = showReal ? realSipCorpus : nominalSipCorpus;
  const expenseDisplay = showReal ? monthlyExpenseNow : futureMonthlyExpense;

  return (
    <div className="card p-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg font-bold text-ink">Inflation Impact</h3>

        {/* Toggle — FIX: onClick directly sets opposite state, no store involved */}
        <button
          onClick={toggle}
          aria-label="Toggle inflation view"
          role="switch"
          aria-checked={showReal}
          className="relative w-14 h-7 rounded-full overflow-hidden transition-colors duration-250 focus-visible:outline-2 focus-visible:outline-blue-DEFAULT"
          style={{ background: showReal ? "#224c87" : "#DDD5C8" }}
        >
          {/* Track (for accessibility) */}
          <span className="sr-only">{showReal ? 'Showing real values' : 'Showing nominal values'}</span>

          {/* Thumb positioned via `left` instead of transform to avoid cumulative/stacking issues */}
          <span
            className="absolute top-0.5 h-6 w-6 bg-white rounded-full shadow transition-all duration-250 pointer-events-none"
            style={{ left: showReal ? "30px" : "2px" }}
          />
        </button>
      </div>

      <p className="text-ink-light text-xs mb-5">
        {showReal
          ? "Showing inflation-adjusted (real) values — what your money is worth in today's purchasing power"
          : "Showing nominal (future money) values — toggle to see real purchasing power"}
      </p>

      {/* Values */}
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-beige-border">
          <span className="text-ink-mid text-sm">Your corpus at retirement</span>
          <span className="num font-bold text-lg text-orange-600">{formatINR(corpusDisplay)}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-ink-mid text-sm">Monthly expense at retirement</span>
          <span className="num font-bold text-orange-600">{formatINR(expenseDisplay)}</span>
        </div>
      </div>

      {/* Explanation note when real is toggled on */}
      {showReal && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-yellow-800 text-xs leading-relaxed">
            Due to inflation, <strong>{formatINR(nominalSipCorpus)}</strong> at retirement
            will have the same purchasing power as <strong>{formatINR(realSipCorpus)}</strong> today.
          </p>
        </div>
      )}
    </div>
  );
}
