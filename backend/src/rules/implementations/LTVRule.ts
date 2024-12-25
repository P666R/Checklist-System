import { Rule } from '../Rule';
import { ApplicationData, RuleResult } from '../../types';
import { parseCurrencyString } from '../../utils/currency';

export class LTVRule implements Rule {
  evaluate(data: ApplicationData): RuleResult {
    const loanAmount = parseCurrencyString(data.mortgage.loanRequired);
    const price = parseCurrencyString(data.mortgage.purchasePrice);

    const ltv = (loanAmount / price) * 100;
    const passed = ltv < 60;

    return {
      ruleName: 'LTV Check',
      passed,
      message: passed
        ? `LTV ${ltv.toFixed(2)}% is below 60%`
        : `LTV ${ltv.toFixed(2)}% exceeds 60%`,
    };
  }
}
