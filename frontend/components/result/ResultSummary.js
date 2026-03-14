"use client";
import { formatINR, formatINRFull } from "../../lib/formulas";
import Tooltip from "../ui/Tooltip";

export default function ResultSummary({ results, currentAge, retirementAge }) {
  if (!results) return null;
  const { corpus, requiredSip, sipCorpus, futureMonthlyExpense, totalInvested, totalGain } = results;

  const stats = [
    { icon:"", label:"Retirement Corpus Needed", value:formatINR(corpus), full:formatINRFull(corpus), color:"text-blue-DEFAULT", tip:"Total lump sum needed at retirement to fund your lifestyle until life expectancy." },
    { icon:"", label:"Monthly SIP Required",     value:formatINR(requiredSip), full:formatINRFull(requiredSip), color:"text-green-700", tip:"Monthly SIP investment needed to exactly reach your corpus goal." },
    { icon:"", label:"Expense at Retirement",    value:formatINR(futureMonthlyExpense), full:formatINRFull(futureMonthlyExpense), color:"text-orange-600", tip:"Your current monthly expense adjusted for inflation by retirement." },
    { icon:"", label:"Total You'll Invest",      value:formatINR(totalInvested), full:formatINRFull(totalInvested), color:"text-ink-mid", tip:"Sum of all monthly SIP payments over the investment period." },
  ];

  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-bold text-ink">Your Retirement Snapshot</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">{s.icon}</span>
              <Tooltip content={s.tip}><span className="text-xs text-ink-faint">ⓘ</span></Tooltip>
            </div>
            <p className="text-ink-light text-xs mb-1">{s.label}</p>
            <p className={`num font-bold text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-ink-faint text-xs mt-1">{s.full}</p>
          </div>
        ))}
      </div>

      {/* Plain English */}
      <div className="card border-l-4 border-blue-DEFAULT p-6">
      <h3 className="font-display text-lg font-bold text-ink mb-3">In plain words</h3>
        <div className="space-y-2 text-sm text-ink-mid leading-relaxed">
          <p>You are <strong className="text-blue-DEFAULT">age {currentAge}</strong> and plan to retire at <strong className="text-blue-DEFAULT">{retirementAge}</strong>, giving you <strong className="text-blue-DEFAULT">{retirementAge - currentAge} years</strong> to invest.</p>
          <p>By retirement, your monthly expenses will rise to <strong className="text-orange-600">{formatINR(futureMonthlyExpense)}/month</strong> due to inflation. To sustain this comfortably, you need a total corpus of <strong className="text-blue-DEFAULT">{formatINR(corpus)}</strong>.</p>
          <p>A monthly <Tooltip content="Systematic Investment Plan — invest a fixed amount every month. Small amounts compounded over decades create massive wealth.">SIP</Tooltip> of <strong className="text-green-700">{formatINR(requiredSip)}</strong> will get you there. Your total investment of <strong className="text-ink">{formatINR(totalInvested)}</strong> grows to <strong className="text-blue-DEFAULT">{formatINR(sipCorpus)}</strong> — a gain of <strong className="text-green-700">{formatINR(totalGain)}</strong>.</p>
        </div>
      </div>
    </div>
  );
}
