"use client";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg)]">
      {/* Soft background blobs — CSS only, no JS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background:"rgba(34,76,135,0.07)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background:"rgba(234,88,12,0.06)", animationDelay:"2s" }} />
        <div className="absolute inset-0" style={{
          backgroundImage:"linear-gradient(rgba(37,99,235,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.03) 1px,transparent 1px)",
          backgroundSize:"60px 60px"
        }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ animation:"fadeUp .7s ease both" }}>
        <div className="inline-flex items-center gap-2 bg-blue-soft border border-blue-tint rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-blue-DEFAULT rounded-full" style={{ animation:"pulse 2s infinite" }} />
          <span className="text-blue-dark text-sm">FinCal - Retire Smart · Investor Education Initiative</span>
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6 text-ink">
          Your retirement is{" "}
          <span className="gradient-text">30 years away.</span>
          <br />Your plan should start today.
        </h1>

        <p className="text-ink-light text-xl md:text-2xl font-body font-light mb-12 max-w-2xl mx-auto">
          No jargon. No sales pitch. Just an honest look at what your future could look like — and a simple plan to get there.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.push("/calculator")} size="lg">Plan My Retirement →</Button>
          <Button variant="ghost" size="lg"
            onClick={() => document.getElementById("learn")?.scrollIntoView({ behavior:"smooth" })}>
            How does it work? ↓
          </Button>
        </div>

        {/* Floating stat cards */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {[
            { icon:"", val:"6%/yr",  lab:"Avg inflation" },
            { icon:"", val:"12%",    lab:"Equity MF avg return" },
            { icon:"", val:"3.4×",  lab:"Cost of waiting 10yr" },
          ].map((s, i) => (
            <div key={s.lab} className="card rounded-xl p-3 text-center anim-float"
              style={{ animationDelay:`${i * 0.7}s` }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="num text-blue-DEFAULT font-bold text-sm">{s.val}</div>
              <div className="text-ink-faint text-xs mt-0.5">{s.lab}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
