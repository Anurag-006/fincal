"use client";
import { create } from "zustand";
import {
  inflationAdjustedExpense, retirementCorpusNeeded,
  sipRequired, sipFutureValue,
  generateYearlyProjection, generateSwpProjection,
} from "../lib/formulas";
import { DEFAULTS, LIFESTYLE } from "../lib/constants";

const useCalculatorStore = create((set, get) => ({
  currentStep: 0,
  quizComplete: false,
  currentAge:           DEFAULTS.CURRENT_AGE,
  retirementAge:        DEFAULTS.RETIREMENT_AGE,
  lifeExpectancy:       DEFAULTS.LIFE_EXPECTANCY,
  monthlyExpense:       DEFAULTS.MONTHLY_EXPENSE,
  lifestyle:            "normal",
  existingSavings:      0,
  monthlySip:           DEFAULTS.MONTHLY_SIP,
  annualReturn:         DEFAULTS.EQUITY_RETURN,
  inflationRate:        DEFAULTS.INFLATION_RATE,
  postRetirementReturn: DEFAULTS.POST_RETIREMENT_RETURN,
  results: null,

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 4) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ quizComplete: true });
      get().calculate();
    }
  },
  prevStep: () => { const { currentStep } = get(); if (currentStep > 0) set({ currentStep: currentStep - 1 }); },
  setInput: (field, value) => set({ [field]: value }),

  calculate: () => {
    const {
      currentAge, retirementAge, lifeExpectancy, monthlyExpense,
      lifestyle, existingSavings, monthlySip, annualReturn,
      inflationRate, postRetirementReturn,
    } = get();

    const multiplier         = LIFESTYLE[lifestyle]?.multiplier ?? 1;
    const adjustedExpense    = monthlyExpense * multiplier;
    const yearsToRetirement  = Math.max(retirementAge - currentAge, 1);
    const retirementDuration = Math.max(lifeExpectancy - retirementAge, 1);

    const futureMonthlyExpense = inflationAdjustedExpense(adjustedExpense, inflationRate, yearsToRetirement);
    const corpus               = retirementCorpusNeeded(futureMonthlyExpense, postRetirementReturn, retirementDuration);
    const requiredSip          = sipRequired(corpus, existingSavings, annualReturn, yearsToRetirement);
    const sipCorpus            = sipFutureValue(monthlySip, annualReturn, yearsToRetirement);
    const totalInvested        = monthlySip * yearsToRetirement * 12;
    const goalProgress = corpus > 0 ? Math.min((sipCorpus / corpus) * 100, 100) : 0;
    const realSipCorpus        = sipCorpus / Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const delayedSip           = sipRequired(corpus, existingSavings, annualReturn, Math.max(yearsToRetirement - 5, 1));
    const yearlyData           = generateYearlyProjection(monthlySip, annualReturn, yearsToRetirement, currentAge);
    const swpData              = generateSwpProjection(sipCorpus, futureMonthlyExpense, postRetirementReturn, retirementDuration, retirementAge);

    set({
      results: {
        futureMonthlyExpense: Math.round(futureMonthlyExpense),
        corpus:               Math.round(corpus),
        requiredSip:          Math.round(requiredSip),
        sipCorpus:            Math.round(sipCorpus),
        realSipCorpus:        Math.round(realSipCorpus),
        totalInvested:        Math.round(totalInvested),
        totalGain:            Math.round(Math.max(sipCorpus - totalInvested, 0)),
        shortfall:            Math.round(Math.max(corpus - sipCorpus, 0)),
        goalProgress:         parseFloat(goalProgress.toFixed(1)),
        alreadyCovered:       requiredSip === 0,
        delayedSip:           Math.round(delayedSip),
        delayCost:            Math.round(Math.max(delayedSip - requiredSip, 0)),
        yearsToRetirement,
        retirementDuration,
        yearlyData,
        swpData,
      },
    });
  },

  reset: () => set({
    currentStep:0, quizComplete:false,
    currentAge:DEFAULTS.CURRENT_AGE, retirementAge:DEFAULTS.RETIREMENT_AGE,
    lifeExpectancy:DEFAULTS.LIFE_EXPECTANCY, monthlyExpense:DEFAULTS.MONTHLY_EXPENSE,
    lifestyle:"normal", existingSavings:0,
    monthlySip:DEFAULTS.MONTHLY_SIP, annualReturn:DEFAULTS.EQUITY_RETURN,
    inflationRate:DEFAULTS.INFLATION_RATE, postRetirementReturn:DEFAULTS.POST_RETIREMENT_RETURN,
    results:null,
  }),
}));

export default useCalculatorStore;
