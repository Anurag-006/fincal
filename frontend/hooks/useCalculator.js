"use client";
import { useEffect } from "react";
import useCalculatorStore from "../store/calculatorStore";

export function useCalculator() {
  const store = useCalculatorStore();
  useEffect(() => {
    if (store.quizComplete) store.calculate();
  }, [store.monthlySip, store.annualReturn, store.inflationRate, store.postRetirementReturn, store.quizComplete]);
  return store;
}
