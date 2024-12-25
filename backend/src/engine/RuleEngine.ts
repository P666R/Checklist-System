import { Rule } from '../rules/Rule';
import { ApplicationData, RuleResult } from '../types';

export class RuleEngine {
  private rules: Rule[] = [];

  addRule(rule: Rule): void {
    this.rules.push(rule);
  }

  evaluate(data: ApplicationData): RuleResult[] {
    return this.rules.map((rule) => rule.evaluate(data));
  }
}
