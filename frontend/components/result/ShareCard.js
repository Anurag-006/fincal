"use client";
import { useRef } from "react";
import { formatINR } from "../../lib/formulas";
import Button from "../ui/Button";

export default function ShareCard({ results, currentAge, retirementAge, lifestyle }) {
  const cardRef = useRef(null);

  const handleDownload = async () => {
    const h2c = (await import("html2canvas")).default;
    const canvas = await h2c(cardRef.current, { backgroundColor:"#EFF6FF", scale:2 });
    const a = document.createElement("a");
    a.download = "FinCal - Retire Smart_Plan.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  if (!results) return null;

  return (
    <div>
      <div ref={cardRef} style={{
        background:"#EFF6FF", border:"2px solid #224c87", borderRadius:"16px", padding:"28px",
        fontFamily:"Montserrat,Arial,Verdana,sans-serif",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px" }}>
          <span style={{ color:"#224c87", fontWeight:700, fontSize:"20px" }}>FinCal - Retire Smart</span>
          <span style={{ color:"#78716C", fontSize:"11px" }}>Age {currentAge} → Retire at {retirementAge}</span>
        </div>
        <div style={{ textAlign:"center", marginBottom:"20px" }}>
          <p style={{ color:"#78716C", fontSize:"11px", marginBottom:"4px" }}>Retirement Corpus Goal</p>
          <p style={{ fontFamily:"JetBrains Mono,monospace", fontWeight:700, fontSize:"38px", color:"#224c87" }}>
            {formatINR(results.corpus)}
          </p>
          <p style={{ color:"#A8A29E", fontSize:"11px", marginTop:"4px" }}>{lifestyle} lifestyle</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"16px" }}>
          {[
            { label:"Monthly SIP",   val:formatINR(results.requiredSip),  color:"#15803D" },
            { label:"Total Invested",val:formatINR(results.totalInvested), color:"#224c87" },
            { label:"Total Gains",   val:formatINR(results.totalGain),     color:"#EA580C" },
          ].map(s => (
            <div key={s.label} style={{ background:"#fff", border:"1px solid #DDD5C8", borderRadius:"10px", padding:"10px", textAlign:"center" }}>
              <p style={{ color:"#78716C", fontSize:"9px", marginBottom:"3px" }}>{s.label}</p>
              <p style={{ fontFamily:"JetBrains Mono,monospace", fontWeight:700, fontSize:"13px", color:s.color }}>{s.val}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:"10px", color:"#78716C", marginBottom:"5px" }}>
            <span>Plan Coverage</span>
            <span style={{ color:"#224c87", fontWeight:700 }}>{results.goalProgress}%</span>
          </div>
          <div style={{ height:"5px", background:"#DBEAFE", borderRadius:"3px", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${Math.min(results.goalProgress,100)}%`, background: results.goalProgress>=100?"#15803D":"#224c87", borderRadius:"3px" }} />
          </div>
        </div>
        <p style={{ textAlign:"center", color:"#A8A29E", fontSize:"9px", marginTop:"12px" }}>
          "This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns."
        </p>
      </div>
      <Button variant="secondary" onClick={handleDownload} className="w-full mt-3">Save as Image</Button>
    </div>
  );
}
