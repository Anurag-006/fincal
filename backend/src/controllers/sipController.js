const { sipFutureValue, lumpsumFutureValue, sipRequired, generateYearlyProjection } = require("../utils/formulas");

/**
 * POST /api/calculate/sip
 */
function calculateSip(req, res) {
  try {
    const { monthlyAmount, annualReturn, years, currentAge = 25 } = req.body;

    const futureValue = sipFutureValue(monthlyAmount, annualReturn, years);
    const totalInvested = monthlyAmount * years * 12;
    const yearlyData = generateYearlyProjection(monthlyAmount, annualReturn, years, currentAge);

    res.json({
      success: true,
      data: {
        futureValue:    Math.round(futureValue),
        totalInvested:  Math.round(totalInvested),
        totalGain:      Math.round(futureValue - totalInvested),
        returnsPercent: (((futureValue - totalInvested) / totalInvested) * 100).toFixed(1),
        yearlyData,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * POST /api/calculate/lumpsum
 */
function calculateLumpsum(req, res) {
  try {
    const { amount, annualReturn, years } = req.body;
    const futureValue = lumpsumFutureValue(amount, annualReturn, years);

    res.json({
      success: true,
      data: {
        futureValue:    Math.round(futureValue),
        totalInvested:  amount,
        totalGain:      Math.round(futureValue - amount),
        returnsPercent: (((futureValue - amount) / amount) * 100).toFixed(1),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { calculateSip, calculateLumpsum };
