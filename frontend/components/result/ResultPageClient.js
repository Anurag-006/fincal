"use client"

import { useRouter } from "next/navigation";
import useCalculatorStore  from "../../store/calculatorStore";
import ResultSummary       from "./ResultSummary";
import ExportButton        from "./ExportButton";
import Button              from "../ui/Button";
import { DEFAULTS }        from "../../lib/constants";
import dynamic from "next/dynamic";

const CorpusChart = dynamic(
  () => import("../../components/calculator/CorpusChart"),
  {
    loading: () => (
      <div className="h-[300px] bg-blue-tint rounded-xl animate-pulse" />
    ),
    ssr: false,
  }
);

const ShareCard = dynamic(
  () => import("../../components/result/ShareCard"),
  { ssr: false }
);


export default function ResultPage() {
  const store  = useCalculatorStore();
  const router = useRouter();

  const {
    results, currentAge, retirementAge, lifestyle,
    monthlySip, annualReturn, inflationRate, postRetirementReturn,
    lifeExpectancy, monthlyExpense, existingSavings,
  } = store;

  /* ── No results yet ── */
  if (!results) {
    return (
      <main style={{ background:"var(--bg)", minHeight:"100vh" }} className="flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-5xl mb-4" aria-hidden="true"></div>
          <p className="text-ink-light text-lg mb-6">No plan calculated yet.</p>
          <Button onClick={() => router.push("/calculator")}>Build My Plan →</Button>
        </div>
      </main>
    );
  }

  /* ── Export data payload (matches exportExcel signature) ── */
  const exportData = {
    currentAge,
    retirementAge,
    lifeExpectancy: lifeExpectancy || DEFAULTS.LIFE_EXPECTANCY,
    monthlyExpense,
    monthlySip,
    annualReturn,
    inflationRate,
    postRetirementReturn,
    existingSavings,
    lifestyle,
    results,
  };

  return (
    <main style={{ background:"var(--bg)", minHeight:"100vh" }}>
      {/* Nav */}
      <nav className="border-b border-beige-border bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => router.push("/")}
          className="font-display font-bold text-xl text-blue-DEFAULT hover:text-blue-dark transition-colors">
          FinCal - Retire Smart
        </button>
        <span className="text-ink-light text-sm hidden sm:block">Your Full Retirement Report</span>
        <Button variant="ghost" size="sm" onClick={() => router.push("/calculator")}>← Calculator</Button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Summary cards + plain-English */}
        <ResultSummary results={results} currentAge={currentAge} retirementAge={retirementAge} />

        {/* Growth chart */}
        <div className="card p-6">
          <h2 className="font-display text-xl font-bold text-ink mb-1">Year-by-Year Corpus Growth</h2>
          <p className="text-ink-light text-sm mb-5">
            Your monthly SIP of{" "}
            <span className="num text-blue-DEFAULT font-bold">
              ₹{monthlySip.toLocaleString("en-IN")}
            </span>{" "}
            compounding over {retirementAge - currentAge} years.
          </p>
          <CorpusChart data={results.yearlyData} targetCorpus={results.corpus} />
        </div>

        {/* SWP drawdown chart */}
{results.swpData?.length > 0 && (
  <div className="card p-6">
    <h2 className="font-display text-xl font-bold text-ink mb-1">
      Post-Retirement Corpus Drawdown (SWP)
    </h2>
    <p className="text-ink-light text-sm mb-5">
      How your corpus is spent through monthly withdrawals after retirement.
    </p>
    <CorpusChart
      data={results.swpData.map(d => ({ ...d, invested: 0 }))}
      targetCorpus={null}
    />
  </div>
)}

        {/* Export + Share */}
        <div className="grid md:grid-cols-2 gap-7">
          {/* Share card */}
          <div>
            <h2 className="font-display text-xl font-bold text-ink mb-4">Share Your Plan</h2>
            <ShareCard
              results={results}
              currentAge={currentAge}
              retirementAge={retirementAge}
              lifestyle={lifestyle}
            />
          </div>

          {/* Export */}
          <div>
            <h2 className="font-display text-xl font-bold text-ink mb-4">Export to Excel</h2>
            <div className="card p-6 space-y-4">
              <p className="text-ink-light text-sm">Your complete plan as an Excel workbook with 3 sheets:</p>
              <ul className="space-y-2 text-sm text-ink-mid">
                {[
                  "📋 Summary — all inputs & key results",
                  "Year by Year — AGE · Savings · SIP · Returns · Withdrawals · Status",
                  "🔀 What-If — cost of starting at different ages",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-DEFAULT font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-ink-faint">
                The Year by Year sheet matches the DTT retirement calculator format with step-up SIP and capital gains tax.
              </p>
              <ExportButton exportData={exportData} />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => { store.reset(); router.push("/calculator"); }}
              >
                🔄 Start Over with New Inputs
              </Button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card p-4 bg-[var(--bg-alt)] text-center">
          <p className="text-ink-faint text-xs leading-relaxed">
            "This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns."
          </p>
        </div>

      </div>
    </main>
  );
}