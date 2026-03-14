/**
 * Input validation helpers
 */

function validateRetirementInput(data) {
  const errors = [];

  const { currentAge, retirementAge, lifeExpectancy, monthlyExpense,
    annualReturn, inflationRate, postRetirementReturn, existingSavings } = data;

  if (!currentAge || currentAge < 18 || currentAge > 60)
    errors.push("currentAge must be between 18 and 60");

  if (!retirementAge || retirementAge <= currentAge || retirementAge > 75)
    errors.push("retirementAge must be greater than currentAge and <= 75");

  if (!lifeExpectancy || lifeExpectancy <= retirementAge)
    errors.push("lifeExpectancy must be greater than retirementAge");

  if (!monthlyExpense || monthlyExpense < 1000)
    errors.push("monthlyExpense must be at least 1000");

  if (!annualReturn || annualReturn < 1 || annualReturn > 30)
    errors.push("annualReturn must be between 1% and 30%");

  if (!inflationRate || inflationRate < 1 || inflationRate > 15)
    errors.push("inflationRate must be between 1% and 15%");

  if (!postRetirementReturn || postRetirementReturn < 1 || postRetirementReturn > 15)
    errors.push("postRetirementReturn must be between 1% and 15%");

  if (existingSavings === undefined || existingSavings < 0)
    errors.push("existingSavings must be >= 0");

  return errors;
}

module.exports = { validateRetirementInput };
