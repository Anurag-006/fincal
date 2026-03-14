export const DEFAULTS = {
  CURRENT_AGE:           25,
  RETIREMENT_AGE:        60,
  LIFE_EXPECTANCY:       80,
  MONTHLY_EXPENSE:       40000,
  EQUITY_RETURN:         12,
  INFLATION_RATE:        6,
  POST_RETIREMENT_RETURN:6,
  MONTHLY_SIP:           5000,
  STEP_UP_RATE:          10,   // % annual SIP step-up (for Excel)
  CAPITAL_GAIN_TAX:      10,   // % LTCG tax (for Excel)
};

export const LIFESTYLE = {
  king:   { label:"Like a King",   multiplier:1.5, desc:"Premium lifestyle, travel, luxury" },
  normal: { label:"Just Like Now", multiplier:1.0, desc:"Same comfort as today" },
  monk:   { label:"Like a Monk",   multiplier:0.7, desc:"Simple, peaceful, minimal needs" },
};

export const INVESTOR_TYPE = {
  safe:       { label:"Safe (FD/PPF)",         return:7,  risk:"Low" },
  balanced:   { label:"Balanced (Hybrid MF)",  return:10, risk:"Medium" },
  aggressive: { label:"Aggressive (Equity MF)", return:12, risk:"High" },
};

export const AGE_PRESETS      = [22,25,28,30,35,40];
export const RETIRE_AGE_PRESETS=[50,55,58,60,62,65];
export const EXPENSE_PRESETS  = [
  {label:"₹20K",value:20000},{label:"₹30K",value:30000},
  {label:"₹40K",value:40000},{label:"₹60K",value:60000},{label:"₹1L",value:100000},
];
export const SAVINGS_PRESETS  = [
  {label:"None yet",value:0},{label:"₹50K",value:50000},{label:"₹1L",value:100000},
  {label:"₹5L",value:500000},{label:"₹10L",value:1000000},{label:"₹25L+",value:2500000},
];
export const SIP_SLIDER = { min:500, max:100000, step:500 };
