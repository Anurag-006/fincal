"use client";
import Tooltip from "../ui/Tooltip";
const DEFS = {
  SIP: "Systematic Investment Plan — a fixed monthly investment into a mutual fund. Small amounts compounded over decades become huge.",
  Corpus: "Total lump sum needed at retirement. It funds your monthly expenses through returns, without running out.",
  Compounding: "Earning returns on your previous returns. ₹1L at 12% for 30 years = ₹29.96L. Time is the magic ingredient.",
  Inflation: "Prices rise every year (~6% in India). ₹40K/month today costs ₹1.28L/month in 30 years.",
  SWP: "Systematic Withdrawal Plan — monthly withdrawal from your corpus after retirement. The reverse of SIP.",
};
export default function ConceptTooltip({ term }) {
  const def = DEFS[term];
  if (!def) return <span>{term}</span>;
  return <Tooltip content={def}>{term}</Tooltip>;
}
