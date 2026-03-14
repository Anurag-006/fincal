"use client";
import { formatINR } from "../../lib/formulas";

export default function GoalMeter({ sipCorpus, targetCorpus, progress, alreadyCovered }) {
  const onTrack = progress >= 100 || alreadyCovered;
  const pct     = Math.min(progress, 100);
  const barCol  = onTrack ? "#15803D" : pct >= 70 ? "#224c87" : "#da3832";

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display text-lg font-bold text-ink">Goal Progress</h3>
        <span className="num font-bold text-xl" style={{ color: barCol }}>
          {alreadyCovered ? "100%" : `${pct.toFixed(1)}%`}
        </span>
      </div>

      <div
        className="h-4 bg-blue-tint rounded-full overflow-hidden mb-4"
        role="progressbar"
        aria-valuenow={alreadyCovered ? 100 : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Goal progress: ${alreadyCovered ? 100 : pct.toFixed(1)} percent`}
      >
        <div
          className="h-full rounded-full anim-grow-bar transition-all duration-1000"
          style={{ width: `${alreadyCovered ? 100 : pct}%`, background: barCol }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-ink-light mb-1">Your SIP will build</p>
          <p className="num font-bold text-xl" style={{ color: barCol }}>{formatINR(sipCorpus)}</p>
        </div>
        <div>
          <p className="text-ink-light mb-1">You need</p>
          <p className="num font-bold text-xl text-ink-mid">{formatINR(targetCorpus)}</p>
        </div>
      </div>

      {alreadyCovered ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center">
          <p className="text-green-800 text-sm font-medium">
            Your existing savings already cover your retirement goal. Any SIP you add accelerates it further.
          </p>
        </div>
      ) : onTrack ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center">
          <p className="text-green-800 text-sm font-medium">
            You're on track! Your SIP exceeds your retirement goal.
          </p>
        </div>
      ) : (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center">
          <p className="text-red-700 text-sm">
            Shortfall:{" "}
            <span className="num font-bold">{formatINR(targetCorpus - sipCorpus)}</span>
            {" "}— consider increasing your monthly SIP.
          </p>
        </div>
      )}
    </div>
  );
}