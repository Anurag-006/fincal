/**
 * FinCal - Retire Smart — Retirement Planning Formulas
 * Includes both analytical formulas (for live UI) and
 * the DTT year-by-year simulation model (for Excel export).
 */

// ─── 1. INFLATION ADJUSTED EXPENSE ───────────────────────────────────────
export function inflationAdjustedExpense(currentMonthly, inflationPct, years) {
  return currentMonthly * Math.pow(1 + inflationPct / 100, years);
}

// ─── 2. RETIREMENT CORPUS NEEDED (PV of Annuity) ─────────────────────────
export function retirementCorpusNeeded(futureMonthlyExpense, postReturnPct, durationYears) {
  const annualExpense = futureMonthlyExpense * 12;
  const r = postReturnPct / 100;                         // annual rate (PDF spec)
  const t = durationYears;                               // years        (PDF spec)
  if (r === 0) return annualExpense * t;
  return annualExpense * ((1 - Math.pow(1 + r, -t)) / r);
}

// ─── 3. SIP FUTURE VALUE ─────────────────────────────────────────────────
export function sipFutureValue(monthlyAmount, annualReturnPct, years) {
  const r = annualReturnPct / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyAmount * n;
  return monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

// ─── 4. SIP REQUIRED ─────────────────────────────────────────────────────
export function sipRequired(targetCorpus, existingSavings, annualReturnPct, years) {
  const r = annualReturnPct / 100 / 12;
  const n = years * 12;
  const fvExisting = existingSavings * Math.pow(1 + r, n);
  const remaining  = Math.max(targetCorpus - fvExisting, 0);
  if (remaining === 0) return 0;
  if (r === 0) return remaining / n;
  return (remaining * r) / (Math.pow(1 + r, n) - 1);
}

// ─── 5. CHART PROJECTION (annual snapshots) ──────────────────────────────
export function generateYearlyProjection(monthlySip, annualReturnPct, totalYears, currentAge) {
  const r = annualReturnPct / 100 / 12;
  return Array.from({ length: totalYears }, (_, i) => {
    const y = i + 1;
    const n = y * 12;
    const corpus   = r === 0 ? monthlySip * n : monthlySip * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = monthlySip * n;
    return { year:y, age:currentAge+y, invested:Math.round(invested), corpus:Math.round(corpus), gain:Math.round(corpus - invested) };
  });
}

// ─── 6. SWP PROJECTION ───────────────────────────────────────────────────
export function generateSwpProjection(startCorpus, monthlyWithdrawal, postReturnPct, durationYears, retirementAge) {
  const r = postReturnPct / 100 / 12;
  let balance = startCorpus;
  return Array.from({ length: durationYears }, (_, i) => {
    for (let m = 0; m < 12; m++) { balance = balance * (1 + r) - monthlyWithdrawal; if (balance < 0) balance = 0; }
    return { year:i+1, age:retirementAge+i+1, corpus:Math.round(balance), withdrawn:Math.round(monthlyWithdrawal*12) };
  }).filter((_, i, arr) => i === 0 || arr[i-1].corpus > 0);
}

// ─── 7. DTT SIMULATION MODEL (for Excel — matches DTT_Retirement__.xlsx) ─
/**
 * Year-by-year retirement simulation exactly matching the DTT Excel model.
 *
 * Columns: AGE | Starting Savings | Additional Savings (SIP) | Return on Investment | Withdrawals | Status
 *
 * Accumulation phase: SIP grows at stepUpRate, returns = savings × growth × (1-tax)
 * Distribution phase: SIP = 0, withdrawals start at retirement and grow by inflation
 *
 * Balance formula: E_next = E + F + G − H × (1 + capitalGainTax)
 */
export function generateDTTSimulation({
  currentAge, retirementAge, planningAge,
  currentSavings, monthlySIP,
  stepUpRatePct, annualGrowthPct, capitalGainTaxPct,
  monthlyExpenses, inflationRatePct,
}) {
  const stepUp   = stepUpRatePct    / 100;
  const growth   = annualGrowthPct  / 100;
  const tax      = capitalGainTaxPct / 100;
  const inflation= inflationRatePct / 100;

  // Post-retirement monthly expense (inflation-adjusted to retirement date)
  const postRetirementMonthly = monthlyExpenses * Math.pow(1 + inflation, retirementAge - currentAge);
  const postRetirementAnnual  = postRetirementMonthly * 12;

  const rows = [];

  // ── First row (current age) ──
  const firstStatus = currentAge === retirementAge ? "START" : "";
  rows.push({
    age:               currentAge,
    savings:           Math.round(currentSavings),
    additionalSavings: Math.round(monthlySIP * 12),
    returns:           Math.round(currentSavings * growth),   // DTT: no tax deduction in year 0
    withdrawals:       0,
    status:            firstStatus,
  });

  for (let i = 1; i <= planningAge - currentAge; i++) {
    const prev = rows[i - 1];
    const age  = prev.age + 1;

    // New savings balance = prev savings + SIP contributions + returns − withdrawals (grossed up for tax)
    const rawSavings = prev.savings + prev.additionalSavings + prev.returns - prev.withdrawals * (1 + tax);
    const savings    = rawSavings; // keep negative to show "OUT OF FUNDS"

    // Status
    const status = age === retirementAge ? "START"
      : savings < 0 ? "OUT OF FUNDS"
      : "";

    // SIP: step-up during accumulation, zero after retirement
    const additionalSavings = age > retirementAge ? 0
      : Math.round(prev.additionalSavings * (1 + stepUp));

    // Returns: after capital gains tax (on positive balance only)
    const returns = savings > 0 ? Math.round(savings * growth * (1 - tax)) : 0;

    // Withdrawals: start at retirement, grow with inflation each subsequent year
    let withdrawals = 0;
    if (status === "START") {
      withdrawals = Math.round(postRetirementAnnual);
    } else if (age > retirementAge && prev.withdrawals > 0) {
      withdrawals = Math.round(prev.withdrawals * (1 + inflation));
    }

    rows.push({ age, savings:Math.round(savings), additionalSavings, returns, withdrawals, status });

    if (status === "OUT OF FUNDS") break;
  }

  return { rows, postRetirementMonthly: Math.round(postRetirementMonthly) };
}

// ─── HELPERS ─────────────────────────────────────────────────────────────
export function formatINR(amount) {
  if (!isFinite(amount) || isNaN(amount)) return "₹0";
  const a = Math.abs(amount);
  if (a >= 1e7) return `₹${(amount/1e7).toFixed(2)} Cr`;
  if (a >= 1e5) return `₹${(amount/1e5).toFixed(2)} L`;
  if (a >= 1e3) return `₹${(amount/1e3).toFixed(1)} K`;
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function formatINRFull(amount) {
  if (!isFinite(amount) || isNaN(amount)) return "₹0";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}
