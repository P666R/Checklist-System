import { ApplicationData, RuleResult } from '../types';

export interface Rule {
  evaluate(data: ApplicationData): RuleResult;
}
