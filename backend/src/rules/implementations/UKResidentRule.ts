import { Rule } from '../Rule';
import { ApplicationData, RuleResult } from '../../types';

export class UKResidentRule implements Rule {
  evaluate(data: ApplicationData): RuleResult {
    return {
      ruleName: 'UK Resident',
      passed: data.isUkResident,
      message: data.isUkResident
        ? 'Applicant is a UK resident'
        : 'Applicant is not a UK resident',
    };
  }
}
