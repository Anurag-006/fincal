"use client";
import { formatINR } from "../../lib/formulas";

export default function WhatIfToggle({ requiredSip, delayedSip, delayCost }) {
  const pct = requiredSip > 0 ? (((delayedSip - requiredSip) / requiredSip) * 100).toFixed(0) : 0;
  return (
    <div className="card p-6">
      <h3 className="font-display text-lg font-bold text-ink mb-1">What if you wait 5 years?</h3>
      <p className="text-ink-light text-sm mb-5">Delaying your SIP by just 5 years has a massive compounding cost.</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="w-6 h-6 rounded-full bg-green-500 mx-auto mb-1" aria-hidden="true" />
          <p className="text-ink-light text-xs mb-1">Start NOW</p>
          <p className="num font-bold text-green-800 text-2xl">{formatINR(requiredSip)}</p>
          <p className="text-ink-faint text-xs mt-1">/month</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="w-6 h-6 rounded-full bg-red-500 mx-auto mb-1" aria-hidden="true" />
          <p className="text-ink-light text-xs mb-1">Wait 5 years</p>
          <p className="num font-bold text-red-700 text-2xl">{formatINR(delayedSip)}</p>
          <p className="text-ink-faint text-xs mt-1">/month</p>
        </div>
      </div>
      {delayCost > 0 && (
        <div className="p-3 bg-[var(--bg-alt)] border border-beige-border rounded-xl text-center">
          <p className="text-ink-mid text-sm">
            Waiting costs <span className="num font-bold text-red-700">{formatINR(delayCost)}/month more</span>
            {" "}— that's <span className="font-semibold text-red-700">{pct}% extra</span> every single month.
          </p>
        </div>
      )}
    </div>
  );
}
