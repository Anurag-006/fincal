"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { formatINR } from "../../lib/formulas";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-beige-border rounded-xl p-4 shadow-lg text-sm">
      <p className="text-blue-DEFAULT num font-bold mb-2">Year {label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background:p.color }} />
          <span className="text-ink-light">{p.name}:</span>
          <span className="num font-semibold text-ink">{formatINR(p.value)}</span>
        </div>
      ))}
      {payload.length >= 2 && (
        <div className="mt-2 pt-2 border-t border-beige-border text-xs text-green-700 num font-bold">
          Gain: {formatINR(payload[1].value - payload[0].value)}
        </div>
      )}
    </div>
  );
};

export default function CorpusChart({ data, targetCorpus }) {
  if (!data?.length) return null;

  // Accessible summary: first, mid, and last data points
  const first = data[0];
  const last  = data[data.length - 1];
  const summaryText = `Corpus growth chart: starts at ${formatINR(first.corpus)} after year ${first.year}, reaches ${formatINR(last.corpus)} after year ${last.year}.${targetCorpus ? ` Target corpus is ${formatINR(targetCorpus)}.` : ""}`;

  return (
    <div className="w-full">
      {/* Screen-reader summary */}
      <p className="sr-only" aria-live="polite">{summaryText}</p>

      {/* Accessible data table (visually hidden, available to AT) */}
      <table className="sr-only" aria-label="Corpus growth data table">
        <caption>Year-by-year corpus and invested amounts</caption>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Age</th>
            <th scope="col">Amount Invested (₹)</th>
            <th scope="col">Corpus Value (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.year}>
              <td>{d.year}</td>
              <td>{d.age}</td>
              <td>{d.invested?.toLocaleString("en-IN")}</td>
              <td>{d.corpus.toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Visual chart — aria-hidden since the table above provides the data */}
      <div aria-hidden="true">
      <div className="flex flex-wrap gap-4 mb-3 text-xs text-ink-light">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-2 rounded bg-blue-tint" />Amount Invested
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-2 rounded bg-blue-DEFAULT" />Corpus Value
        </span>
        {targetCorpus && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-8 h-0 border-t-2 border-dashed border-orange-500" />Your Goal
          </span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top:10,right:10,left:0,bottom:0 }}>
          <defs>
            <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#DBEAFE" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#DBEAFE" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#224c87" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#224c87" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.07)" />
          <XAxis dataKey="year" tick={{ fill:"#78716C",fontSize:11 }} tickFormatter={v => `Yr ${v}`}
            axisLine={{ stroke:"rgba(0,0,0,0.1)" }} />
          <YAxis tick={{ fill:"#78716C",fontSize:11 }} tickFormatter={v => formatINR(v)}
            axisLine={{ stroke:"rgba(0,0,0,0.1)" }} width={68} />
          <Tooltip content={<CustomTooltip />} />
          {targetCorpus && (
            <ReferenceLine y={targetCorpus} stroke="#EA580C" strokeDasharray="5 3" strokeWidth={2}
              label={{ value:"Goal", fill:"#EA580C", fontSize:11 }} />
          )}
          <Area type="monotone" dataKey="invested" name="Invested"
            stroke="#DBEAFE" fill="url(#gI)" strokeWidth={1.5} />
<Area type="monotone" dataKey="corpus" name="Corpus"
            stroke="#224c87" fill="url(#gC)" strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}