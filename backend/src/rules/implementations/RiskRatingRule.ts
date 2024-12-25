import { Rule } from '../Rule';
import { ApplicationData, RuleResult } from '../../types';

export class RiskRatingRule implements Rule {
  evaluate(data: ApplicationData): RuleResult {
    const passed = data.riskRating === 'Medium';
    return {
      ruleName: 'Risk Rating',
      passed,
      message: passed
        ? 'Risk rating is Medium'
        : `Risk rating ${data.riskRating} is not acceptable`,
    };
  }
}
