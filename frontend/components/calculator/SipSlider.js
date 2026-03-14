"use client";
import useCalculatorStore from "../../store/calculatorStore";
import Slider from "../ui/Slider";
import { formatINRFull } from "../../lib/formulas";
import { SIP_SLIDER, INVESTOR_TYPE } from "../../lib/constants";

export default function SipSlider() {
  const { monthlySip, annualReturn, inflationRate, postRetirementReturn, setInput, calculate } = useCalculatorStore();

  const update = (field, value) => { setInput(field, value); calculate(); };

  return (
    <div className="space-y-7">
      <Slider label="Monthly SIP Amount"
        value={monthlySip} min={SIP_SLIDER.min} max={SIP_SLIDER.max} step={SIP_SLIDER.step}
        onChange={v => update("monthlySip", v)} format={formatINRFull} />

      {/* Investor profile presets */}
      <div>
        <p className="text-sm text-ink-light mb-3">Your investor profile:</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(INVESTOR_TYPE).map(([key, inv]) => (
            <button key={key} onClick={() => update("annualReturn", inv.return)}
              className={`p-3 rounded-xl text-xs text-center transition-all border ${
                annualReturn === inv.return
                  ? "border-blue-DEFAULT bg-blue-soft text-blue-dark font-semibold"
                  : "border-beige-border bg-white text-ink-light hover:border-blue-DEFAULT hover:text-blue-DEFAULT"
              }`}>
              <div className="font-semibold mb-1 text-sm">{inv.label.split("(")[0].trim()}</div>
              <div className="num text-blue-DEFAULT font-bold">{inv.return}%/yr</div>
              <div className="text-ink-faint text-xs mt-0.5">{inv.risk} risk</div>
            </button>
          ))}
        </div>
      </div>

      <Slider label="Expected Annual Return (%)"
        value={annualReturn} min={5} max={18} step={0.5}
        onChange={v => update("annualReturn", v)} format={v => `${v}%`} />

      <Slider label="Inflation Rate (%)"
        value={inflationRate} min={3} max={10} step={0.5}
        onChange={v => update("inflationRate", v)} format={v => `${v}%`} />

      <Slider label="Post-Retirement Return (%)"
        value={postRetirementReturn} min={4} max={10} step={0.5}
        onChange={v => update("postRetirementReturn", v)} format={v => `${v}%`} />
    </div>
  );
}
