import axios from 'axios';
import { ApplicationData } from '../types';
import { logger } from '../utils/logger';
import { config } from '../config/environment';

export class ApplicationService {
  async fetchApplicationData(id: string): Promise<ApplicationData> {
    try {
      const response = await axios.get(
        `${config.apiBaseUrl}/applications/getApplicationById/${id}`
      );

      const { isValuationFeePaid, isUkResident, riskRating, mortgage } =
        response.data;

      return {
        isValuationFeePaid,
        isUkResident,
        riskRating,
        mortgage: {
          loanRequired: mortgage.loanRequired,
          purchasePrice: mortgage.purchasePrice,
        },
      };
    } catch (error) {
      logger.error('Failed to fetch application data:', error);
      throw new Error('Failed to fetch application data');
    }
  }
}
