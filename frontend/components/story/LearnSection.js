"use client";
import { useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const TERMS = [
  {
    term: "SIP",
    full: "Systematic Investment Plan",
    emoji: "",
    simple: "Think of SIP like a gym membership for your money.",
    explain: "Instead of investing a big amount once, you invest a small fixed amount every month — say ₹5,000 — automatically. You don't have to think about it, it just happens. Over time, even small amounts grow into something massive.",
    example: "₹5,000/month for 30 years at 12% return = ₹1.76 Crore",
    color: "blue",
  },
  {
    term: "Corpus",
    full: "Retirement Corpus",
    emoji: "",
    simple: "Your corpus is the total pile of money you need to have saved by the time you retire.",
    explain: "Imagine you need ₹50,000/month after retirement. You won't earn a salary anymore, so you need a big enough savings account that generates ₹50,000 every month through interest alone — without ever running out. That total amount is your corpus.",
    example: "If you need ₹50,000/month for 20 years, your corpus = approx ₹55 Lakh",
    color: "green",
  },
  {
    term: "Compounding",
    full: "Compound Interest",
    emoji: "",
    simple: "You earn interest on your interest. That's it. That's the whole magic.",
    explain: "If you invest ₹1,000 and earn 10%, you have ₹1,100. Next year, you earn 10% on ₹1,100 (not just ₹1,000). Year after, on ₹1,210. The snowball keeps rolling and growing faster and faster. The longer you wait, the bigger the snowball gets.",
    example: "₹1 Lakh invested for 30 years at 12% = ₹29.96 Lakh (29× your money!)",
    color: "orange",
  },
  {
    term: "Inflation",
    full: "Inflation Rate",
    emoji: "",
    simple: "Prices go up every year. ₹100 today won't buy the same thing 20 years from now.",
    explain: "India's average inflation is ~6% per year. That means what costs ₹40,000/month today will cost ₹1.28 Lakh/month in 30 years. Your retirement plan must account for this — otherwise you'll run out of money much sooner than expected.",
    example: "₹40,000/month today → ₹1,28,285/month in 30 years (at 6% inflation)",
    color: "red",
  },
  {
    term: "SWP",
    full: "Systematic Withdrawal Plan",
    emoji: "",
    simple: "The reverse of SIP. After you retire, you withdraw a fixed amount every month from your corpus.",
    explain: "Once you retire, you stop putting money in and start taking money out. SWP lets you set a monthly withdrawal amount. Your remaining corpus continues to earn returns, so it lasts longer. Think of it like a salary that your savings pays you.",
    example: "₹1 Cr corpus with 6% return: SWP of ₹60,000/month lasts 22+ years",
    color: "purple",
  },
];

const COLORS = {
  blue:   { bg:"bg-blue-soft",   border:"border-blue-DEFAULT", dot:"bg-blue-DEFAULT",  text:"text-blue-dark",  ex:"text-blue-DEFAULT" },
  green:  { bg:"bg-green-50",    border:"border-green-500",    dot:"bg-green-500",      text:"text-green-800",  ex:"text-green-700" },
  orange: { bg:"bg-orange-50",   border:"border-orange-500",   dot:"bg-orange-500",     text:"text-orange-800", ex:"text-orange-700" },
  red:    { bg:"bg-red-50",      border:"border-red-400",      dot:"bg-red-500",        text:"text-red-800",    ex:"text-red-700" },
  purple: { bg:"bg-purple-50",   border:"border-purple-400",   dot:"bg-purple-500",     text:"text-purple-800", ex:"text-purple-700" },
};

function TermCard({ t, idx }) {
  const [open, setOpen] = useState(false);
  const ref = useScrollAnimation();
  const c = COLORS[t.color];

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay:`${idx * 0.08}s` }}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full text-left card p-5 border-l-4 ${c.border} transition-all duration-200 ${open ? c.bg : "hover:bg-beige-alt"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{t.emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-mono font-bold text-lg ${c.text}`}>{t.term}</span>
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
              </div>
              <div className="text-ink-light text-sm">{t.full}</div>
            </div>
          </div>
          <span className="text-ink-faint text-xl select-none">{open ? "▲" : "▼"}</span>
        </div>

        {/* Simple one-liner always visible */}
        <p className="mt-3 text-ink-mid text-sm italic">{t.simple}</p>

        {/* Expanded explanation */}
        {open && (
          <div className="mt-4 pt-4 border-t border-beige-border space-y-3">
            <p className="text-ink-mid text-sm leading-relaxed">{t.explain}</p>
            <div className={`${c.bg} border ${c.border} rounded-lg px-4 py-2`}>
              <span className="text-xs text-ink-light font-semibold uppercase tracking-wide">Example: </span>
              <span className={`text-sm font-mono font-semibold ${c.ex}`}>{t.example}</span>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}

export default function LearnSection() {
  const ref = useScrollAnimation();

  return (
    <section id="learn" className="py-24 px-6 bg-[var(--bg-alt)]">
      <div className="max-w-3xl mx-auto">
        <div ref={ref} className="reveal text-center mb-14">
          <p className="text-blue-DEFAULT text-sm uppercase tracking-widest mb-3 font-semibold">Before We Begin</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-ink">
            5 terms you must know
          </h2>
          <p className="text-ink-light text-lg max-w-xl mx-auto">
            Don't worry — no finance degree needed. Click each term to understand it in plain language.
          </p>
        </div>

        <div className="space-y-3">
          {TERMS.map((t, i) => <TermCard key={t.term} t={t} idx={i} />)}
        </div>

        <div className="mt-10 card p-5 border-l-4 border-blue-DEFAULT bg-blue-soft text-center">
          <p className="text-blue-dark text-sm">
            Got those? Now let's see how they all work together in a real story.
          </p>
        </div>
      </div>
    </section>
  );
}
