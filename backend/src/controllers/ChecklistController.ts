import { Request, Response } from 'express';
import { RuleEngine } from '../engine/RuleEngine';
import { ApplicationService } from '../services/ApplicationService';
import { logger } from '../utils/logger';

export class ChecklistController {
  constructor(
    private ruleEngine: RuleEngine,
    private applicationService: ApplicationService
  ) {}

  async evaluateRules(req: Request, res: Response): Promise<void> {
    try {
      const { applicationId } = req.params;
      const data = await this.applicationService.fetchApplicationData(
        applicationId
      );
      const results = this.ruleEngine.evaluate(data);
      res.json(results);
    } catch (error) {
      logger.error('Error evaluating rules:', error);
      res.status(500).json({ error: 'Failed to evaluate rules' });
    }
  }
}
