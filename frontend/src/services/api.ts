import axios from 'axios';
import { RuleResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const checklistApi = {
  getResults: async (applicationId: string): Promise<RuleResult[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/checklist/${applicationId}`
    );
    return response.data;
  },
};
