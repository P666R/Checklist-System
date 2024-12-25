import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT ?? 3000,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  apiBaseUrl:
    process.env.API_BASE_URL ?? 'http://qa-gb.api.dynamatix.com:3100/api',
};

// http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639
