import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/environment';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { RuleEngine } from './engine/RuleEngine';
import { ApplicationService } from './services/ApplicationService';
import { ChecklistController } from './controllers/ChecklistController';
import { ValuationFeePaidRule } from './rules/implementations/ValuationFeePaidRule';
import { UKResidentRule } from './rules/implementations/UKResidentRule';
import { RiskRatingRule } from './rules/implementations/RiskRatingRule';
import { LTVRule } from './rules/implementations/LTVRule';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Setup Rule Engine
const ruleEngine = new RuleEngine();
ruleEngine.addRule(new ValuationFeePaidRule());
ruleEngine.addRule(new UKResidentRule());
ruleEngine.addRule(new RiskRatingRule());
ruleEngine.addRule(new LTVRule());

// Setup Services and Controllers
const applicationService = new ApplicationService();
const checklistController = new ChecklistController(
  ruleEngine,
  applicationService
);

// Routes
app.get('/api/checklist/:applicationId', (req, res) =>
  checklistController.evaluateRules(req, res)
);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
