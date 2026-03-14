/**
 * FinCal - Retire Smart Backend - Financial Formulas
 * Mirrors frontend/lib/formulas.js — single source of truth on the server
 */

function inflationAdjustedExpense(monthlyExpense, inflationRate, years) {
  return monthlyExpense * Math.pow(1 + inflationRate / 100, years);
}

function retirementCorpusNeeded(futureMonthlyExpense, postRetirementReturn, retirementDuration) {
  const annualExpense = futureMonthlyExpense * 12;
  const r = postRetirementReturn / 100;      // annual rate — matches PDF Step 2
  const t = retirementDuration;              // years
  if (r === 0) return annualExpense * t;
  return annualExpense * ((1 - Math.pow(1 + r, -t)) / r);
}

function sipFutureValue(monthlyAmount, annualReturn, years) {
  const r = annualReturn / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyAmount * n;
  return monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

function sipRequired(targetCorpus, existingSavings, annualReturn, years) {
  const r = annualReturn / 100 / 12;
  const n = years * 12;
  const fvOfExisting = existingSavings * Math.pow(1 + r, n);
  const remaining = Math.max(targetCorpus - fvOfExisting, 0);
  if (r === 0) return remaining / n;
  return (remaining * r) / (Math.pow(1 + r, n) - 1);
}

function lumpsumFutureValue(amount, annualReturn, years) {
  return amount * Math.pow(1 + annualReturn / 100, years);
}

function swpMonthlyWithdrawal(corpus, annualReturn, years) {
  const r = annualReturn / 100 / 12;
  const n = years * 12;
  if (r === 0) return corpus / n;
  return (corpus * r) / (1 - Math.pow(1 + r, -n));
}

function generateYearlyProjection(monthlySip, annualReturn, years, currentAge) {
  const data = [];
  const r = annualReturn / 100 / 12;
  for (let y = 1; y <= years; y++) {
    const n = y * 12;
    const corpus = r === 0
      ? monthlySip * n
      : monthlySip * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = monthlySip * n;
    data.push({
      year: y, age: currentAge + y,
      invested: Math.round(invested),
      corpus: Math.round(corpus),
      gain: Math.round(corpus - invested),
    });
  }
  return data;
}

module.exports = {
  inflationAdjustedExpense,
  retirementCorpusNeeded,
  sipFutureValue,
  sipRequired,
  lumpsumFutureValue,
  swpMonthlyWithdrawal,
  generateYearlyProjection,
};
