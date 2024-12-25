export interface ApplicationData {
  isValuationFeePaid: boolean;
  isUkResident: boolean;
  riskRating: string;
  mortgage: {
    loanRequired: string;
    purchasePrice: string;
  };
}

export interface RuleResult {
  ruleName: string;
  passed: boolean;
  message: string;
}
