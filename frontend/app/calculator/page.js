"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import QuizShell        from "../../components/quiz/QuizShell";
import SipSlider        from "../../components/calculator/SipSlider";
import CorpusChart      from "../../components/calculator/CorpusChart";
import GoalMeter        from "../../components/calculator/GoalMeter";
import WhatIfToggle     from "../../components/calculator/WhatIfToggle";
import InflationToggle  from "../../components/calculator/InflationToggle";
import useCalculatorStore from "../../store/calculatorStore";
import Button           from "../../components/ui/Button";

export default function CalculatorPage() {
  const store  = useCalculatorStore();
  const router = useRouter();
  const { quizComplete, results, currentAge, retirementAge, monthlyExpense, calculate } = store;

  // Recalculate whenever sliders change after quiz completes
  useEffect(() => { if (quizComplete) calculate(); },
    [store.monthlySip, store.annualReturn, store.inflationRate, store.postRetirementReturn, quizComplete]);

  return (
    <main style={{ background:"var(--bg)", minHeight:"100vh" }}>
      {/* Sticky nav */}
      <nav className="border-b border-beige-border bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => router.push("/")}
          className="font-display font-bold text-xl text-blue-DEFAULT hover:text-blue-dark transition-colors">
          FinCal - Retire Smart
        </button>
        <span className="text-ink-light text-sm hidden sm:block">
          {quizComplete ? "Your Retirement Calculator" : "Tell Us About You"}
        </span>
        {quizComplete && (
          <Button variant="ghost" size="sm" onClick={() => router.push("/result")}>
            Full Report →
          </Button>
        )}
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {!quizComplete ? (
          /* ── QUIZ ── */
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl font-bold mb-3 text-ink">Let's build your retirement plan</h1>
              <p className="text-ink-light">5 quick questions. No finance knowledge needed.</p>
            </div>
            <QuizShell />
          </div>
        ) : (
          /* ── CALCULATOR ── */
          <div>
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl font-bold mb-3 text-ink">
                Your <span className="gradient-text">Retirement Calculator</span>
              </h1>
              <p className="text-ink-light">Drag the sliders below — all numbers update live.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-7">
              {/* Left — sliders */}
              <div className="space-y-5">
                <div className="card p-6">
                  <h2 className="font-display text-xl font-bold text-ink mb-6">Adjust Your Plan</h2>
                  <SipSlider />
                </div>

                {results && (
                  <>
                    <WhatIfToggle
                      requiredSip={results.requiredSip}
                      delayedSip={results.delayedSip}
                      delayCost={results.delayCost}
                    />
                    {/* FIX: pass nominalSipCorpus and realSipCorpus — both pre-computed in store */}
                    <InflationToggle
                      nominalSipCorpus={results.sipCorpus}
                      realSipCorpus={results.realSipCorpus}
                      monthlyExpenseNow={monthlyExpense}
                      futureMonthlyExpense={results.futureMonthlyExpense}
                    />
                  </>
                )}
              </div>

              {/* Right — chart + goal */}
              <div className="space-y-5">
                {results ? (
                  <>
                    <div className="card p-6">
                      <h2 className="font-display text-xl font-bold text-ink mb-1">Corpus Growth Over Time</h2>
                      <p className="text-ink-light text-sm mb-5">
                        Blue curve = your corpus · Light area = what you put in · Orange line = your goal
                      </p>
                      <CorpusChart data={results.yearlyData} targetCorpus={results.corpus} />
                    </div>
<GoalMeter
  sipCorpus={results.sipCorpus}
  targetCorpus={results.corpus}
  progress={results.goalProgress}
  alreadyCovered={results.alreadyCovered}
/>
                    <Button size="lg" className="w-full" onClick={() => router.push("/result")}>
                      View Full Report + Export →
                    </Button>
                  </>
                ) : (
                  <div className="card p-12 text-center text-ink-light">
                    Complete the quiz to see your chart
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
