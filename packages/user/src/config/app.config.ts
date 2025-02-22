// src/config/app.config.ts
import { validatePort } from '@myuber/utils';
import dotenv from 'dotenv';

dotenv.config();

class AppConfig {
  public readonly port: number | null;
  public readonly mongoUri: string;
  public readonly nodeEnv: string;

  constructor() {
    this.port = validatePort(process.env.PORT || '3000');
    this.mongoUri = process.env.MONGO_URI as string;
    this.nodeEnv = process.env.NODE_ENV || 'development';

    this.validateConfig();
  }

  private validateConfig(): void {
    if (!this.mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment.');
    }
  }

  public isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }
}

export const appConfig = new AppConfig();
