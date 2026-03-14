"use client";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { formatINR, sipFutureValue } from "../../lib/formulas";

// Pre-computed at module level (no hooks in loops)
const YEARS  = [5, 10, 15, 20, 25, 30, 35];
const DATA   = YEARS.map(y => ({
  year:   y,
  rahul:  Math.round(sipFutureValue(5000, 12, y)),       // starts age 25
  vikram: y > 10 ? Math.round(sipFutureValue(5000, 12, y - 10)) : 0, // starts age 35
}));
const MAX_VAL = DATA[DATA.length - 1].rahul;

function Bar({ value, color, label }) {
  if (value === 0) return (
    <div className="flex items-center gap-2 flex-1">
      <div className="h-7 w-0" />
      <span className="text-xs text-ink-faint italic">Not started yet</span>
    </div>
  );

  const pct      = (value / MAX_VAL) * 100;
  const isSmall  = pct < 14;
  const bgClass  = color === "blue" ? "bg-blue-DEFAULT" : "bg-blue-400";

  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      {/* Bar */}
      <div
        className={`relative h-7 rounded-lg flex items-center shrink-0 transition-all duration-700 ${bgClass} shadow-sm`}
        style={{ width:`${Math.max(pct, 1.2)}%` }}
      >
        {!isSmall && (
          <span className="absolute right-2 text-xs font-mono text-white font-bold whitespace-nowrap">
            {formatINR(value)}
          </span>
        )}
      </div>
      {/* Label outside for small bars */}
      {isSmall && (
        <span className={`text-xs font-mono font-bold whitespace-nowrap ${color === "blue" ? "text-blue-DEFAULT" : "text-blue-400"}`}>
          {formatINR(value)}
        </span>
      )}
    </div>
  );
}

export default function CompoundingScene() {
  const headerRef = useScrollAnimation();
  const cardRef1  = useScrollAnimation();
  const cardRef2  = useScrollAnimation();
  const chartRef  = useScrollAnimation();

  const rahulFinal   = DATA[DATA.length - 1].rahul;
  const vikramFinal  = DATA[DATA.length - 1].vikram;
  const rahulInv     = 5000 * 35 * 12;
  const vikramInv    = 5000 * 25 * 12;
  const rahulRet     = (((rahulFinal  - rahulInv)  / rahulInv)  * 100).toFixed(0);
  const vikramRet    = (((vikramFinal - vikramInv) / vikramInv) * 100).toFixed(0);

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div ref={headerRef} className="reveal text-center mb-14">
        <p className="text-blue-DEFAULT text-sm uppercase tracking-widest mb-3 font-semibold">The Power of Starting Early</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-ink">Meet Rahul &amp; Vikram</h2>
        <p className="text-ink-light text-xl max-w-2xl mx-auto">
          Same salary. Same investment amount. Same fund. The only difference?{" "}
          <strong className="text-blue-DEFAULT">When they started.</strong>
        </p>
      </div>

      {/* Character cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div ref={cardRef1} className="reveal card p-6 border-2 border-blue-DEFAULT">
          <div className="text-3xl mb-2">🧑</div>
          <h3 className="font-display text-2xl font-bold text-blue-DEFAULT mb-1">Rahul</h3>
          <p className="text-ink-light text-sm mb-5">Starts SIP at 25 · Retires at 60 · 35 years of investing</p>
          <div className="space-y-2 text-sm">
            <Row label="Monthly SIP"   val="₹5,000"           />
            <Row label="Total Invested" val={formatINR(rahulInv)} />
            <Row label="Corpus at 60"  val={formatINR(rahulFinal)} bold blue />
            <Row label="Returns"       val={`${rahulRet}%`}   green />
          </div>
        </div>

        <div ref={cardRef2} className="reveal card p-6 border border-beige-border">
          <div className="text-3xl mb-2">👴</div>
          <h3 className="font-display text-2xl font-bold text-ink-light mb-1">Vikram</h3>
          <p className="text-ink-light text-sm mb-5">Starts SIP at 35 · Retires at 60 · 25 years of investing</p>
          <div className="space-y-2 text-sm">
            <Row label="Monthly SIP"   val="₹5,000"           />
            <Row label="Total Invested" val={formatINR(vikramInv)} />
            <Row label="Corpus at 60"  val={formatINR(vikramFinal)} bold />
            <Row label="Returns"       val={`${vikramRet}%`}  />
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div ref={chartRef} className="reveal card p-8">
        <h3 className="font-display text-xl text-center mb-8 text-ink">
          Corpus Growth Over Time (₹5,000/month @ 12%)
        </h3>

        <div className="space-y-5">
          {DATA.map(row => (
            <div key={row.year}>
              <div className="flex justify-between text-xs text-ink-faint mb-1.5">
                <span>Year {row.year}</span>
                <span>Age {25 + row.year}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-12 text-xs font-semibold text-blue-DEFAULT text-right shrink-0">Rahul</span>
                <Bar value={row.rahul}  color="blue" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-xs text-ink-light text-right shrink-0">Vikram</span>
                <Bar value={row.vikram} color="gray" />
              </div>
            </div>
          ))}
        </div>

        {/* Punchline */}
        <div className="mt-8 p-5 bg-blue-soft border border-blue-tint rounded-xl text-center">
          <p className="text-ink text-lg">
            Rahul ends up with{" "}
            <span className="text-blue-DEFAULT font-bold num text-2xl">{formatINR(rahulFinal)}</span>
            {" "}vs Vikram's{" "}
            <span className="text-ink-mid font-bold num text-xl">{formatINR(vikramFinal)}</span>
          </p>
          <p className="text-ink-light text-sm mt-2">
            Rahul invested for just 10 extra years — but ended up with{" "}
            <span className="text-blue-DEFAULT font-semibold">
              {(rahulFinal / vikramFinal).toFixed(1)}× more money.
            </span>{" "}
            That's compounding at work.
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({ label, val, bold, blue, green }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-ink-light">{label}</span>
      <span className={`num ${bold ? "text-base font-bold" : ""} ${blue ? "text-blue-DEFAULT" : green ? "text-green-700" : "text-ink-mid"}`}>
        {val}
      </span>
    </div>
  );
}
