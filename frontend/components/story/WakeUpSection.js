"use client";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

const FACTS = [
  { icon:"", stat:"6%",   label:"Avg annual inflation in India",    insight:"₹40,000/month today → ₹1.28 Lakh/month in 30 years." },
  { icon:"", stat:"80",   label:"Average Indian life expectancy",    insight:"You may need to fund 20+ years of retirement comfortably." },
  { icon:"", stat:"40%",  label:"Purchasing power lost in 20 years", insight:"FD barely beats inflation. Equity mutual funds do much better." },
  { icon:"", stat:"3.4×", label:"More SIP if you delay 10 years",    insight:"Start at 25 vs 35 — same goal, but 3.4× less monthly SIP." },
];

export default function WakeUpSection() {
  const headerRef = useScrollAnimation();
  const factRefs  = [useScrollAnimation(), useScrollAnimation(), useScrollAnimation(), useScrollAnimation()];
  const router    = useRouter();

  return (
    <section className="py-24 px-6 bg-[var(--bg-alt)]">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal text-center mb-14">
          <p className="text-blue-DEFAULT text-sm uppercase tracking-widest mb-3 font-semibold">Why This Matters</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-ink">The clock is already ticking.</h2>
          <p className="text-ink-light text-xl max-w-2xl mx-auto">
            Most people know they should plan for retirement. Very few actually do. Here's what you're up against.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {FACTS.map((f, i) => (
            <div key={f.label} ref={factRefs[i]}
              className="reveal card p-6 flex gap-5 items-start"
              style={{ transitionDelay:`${i * 0.1}s` }}>
              <div className="text-4xl shrink-0">{f.icon}</div>
              <div>
                <div className="num text-blue-DEFAULT font-bold text-2xl">{f.stat}</div>
                <div className="text-ink-light text-sm mb-1">{f.label}</div>
                <div className="text-ink-mid text-sm leading-relaxed">{f.insight}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-ink-light text-lg mb-6">Ready to see what <em>your</em> retirement looks like?</p>
          <Button size="lg" onClick={() => router.push("/calculator")}>Calculate My Plan →</Button>
        </div>
      </div>
    </section>
  );
}
