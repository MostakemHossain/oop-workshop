import dotenv from 'dotenv';
import { AppConfig } from './AppConfig';

dotenv.config();

const config = AppConfig.getInstance();

console.log(config.getEnv('DATABASE_URL'));
