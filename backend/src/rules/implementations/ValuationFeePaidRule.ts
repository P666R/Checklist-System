import { Rule } from '../Rule';
import { ApplicationData, RuleResult } from '../../types';

export class ValuationFeePaidRule implements Rule {
  evaluate(data: ApplicationData): RuleResult {
    return {
      ruleName: 'Valuation Fee Paid',
      passed: data.isValuationFeePaid,
      message: data.isValuationFeePaid
        ? 'Valuation fee has been paid'
        : 'Valuation fee is pending',
    };
  }
}
