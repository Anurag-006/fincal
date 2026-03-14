const {
  inflationAdjustedExpense,
  retirementCorpusNeeded,
  sipFutureValue,
  sipRequired,
  generateYearlyProjection,
} = require("../utils/formulas");

const LIFESTYLE_MULTIPLIER = { king: 1.5, normal: 1.0, monk: 0.7 };

/**
 * POST /api/calculate/retirement
 * Full retirement plan calculation
 */
function calculateRetirement(req, res) {
  try {
    const {
      currentAge, retirementAge, lifeExpectancy,
      monthlyExpense, lifestyle = "normal",
      existingSavings = 0, monthlySip,
      annualReturn, inflationRate, postRetirementReturn,
    } = req.body;

    const multiplier = LIFESTYLE_MULTIPLIER[lifestyle] || 1;
    const adjustedExpense = monthlyExpense * multiplier;
    const yearsToRetirement = retirementAge - currentAge;
    const retirementDuration = lifeExpectancy - retirementAge;

    const futureMonthlyExpense = inflationAdjustedExpense(
      adjustedExpense, inflationRate, yearsToRetirement
    );
    const corpus = retirementCorpusNeeded(
      futureMonthlyExpense, postRetirementReturn, retirementDuration
    );
    const requiredSip = sipRequired(corpus, existingSavings, annualReturn, yearsToRetirement);
    const sipCorpus   = sipFutureValue(monthlySip, annualReturn, yearsToRetirement);
    const totalInvested = monthlySip * yearsToRetirement * 12;
    const goalProgress  = Math.min((sipCorpus / corpus) * 100, 100);

    // Delayed SIP (5 years late)
    const delayedYears = Math.max(yearsToRetirement - 5, 1);
    const delayedSip = sipRequired(corpus, existingSavings, annualReturn, delayedYears);

    const yearlyData = generateYearlyProjection(
      monthlySip, annualReturn, yearsToRetirement, currentAge
    );

    res.json({
      success: true,
      data: {
        futureMonthlyExpense: Math.round(futureMonthlyExpense),
        corpus:               Math.round(corpus),
        requiredSip:          Math.round(requiredSip),
        sipCorpus:            Math.round(sipCorpus),
        totalInvested:        Math.round(totalInvested),
        totalGain:            Math.round(sipCorpus - totalInvested),
        shortfall:            Math.round(Math.max(corpus - sipCorpus, 0)),
goalProgress:   parseFloat(goalProgress.toFixed(1)),
alreadyCovered: requiredSip <= 0,
        delayedSip:           Math.round(delayedSip),
        delayCost:            Math.round(delayedSip - requiredSip),
        yearlyData,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { calculateRetirement };
