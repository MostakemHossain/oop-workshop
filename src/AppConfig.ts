interface DatabaseConfig {
  url: string;
  name?: string;
  pollSize?: number;
}

interface securityConfig {
  jwtSecret: string;
  corsOrigin: string[];
  allowsHosts?: string[];
}

type logLevel = 'debug' | 'info' | 'warn' | 'error';
type Environment = 'production' | 'development' | 'staging';

interface serverConfig {
  port: number;
  apiUrl: string;
  logLevel: logLevel;
}

interface AppConfigOptions {
  database: DatabaseConfig;
  security: securityConfig;
  server: serverConfig;
}

const requiredEnvVars = [
  'DATABASE_URL',
  'DATABASE_NAME',
  'DATABASE_POLL_SIZE',
  'JWT_SECRET',
  'PORT',
];

export class AppConfig {
  private static instance: AppConfig;
  private readonly config: AppConfigOptions;

  private constructor() {
    this.config = this.loadOptions();
  }

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
  private loadOptions(): AppConfigOptions {
    this.validateRequiredEnvVars();
    return {
      database: {
        url: this.getEnv('DATABASE_URL', true),
        name: this.getEnv('DATABASE_NAME', true),
        pollSize: parseInt(process.env.DATABASE_POLL_SIZE!),
      },
      security: {
        jwtSecret: this.getEnv('JWT_SECRET', true),
        corsOrigin: this.parseCorsOrigin(),
        allowsHosts: this.parseAllowedHosts(),
      },
      server: {
        port: parseInt(this.getEnv('PORT')),
        apiUrl: this.getEnv('API_URL'),
        logLevel: this.parseLogLevel(),
      },
    };
  }

  private validateRequiredEnvVars(): void {
    const missingVars = requiredEnvVars.filter(
      (varname) => !process.env?.[varname],
    );
    if (missingVars.length > 0) {
      throw new Error(
        `Missing environment variables: ${missingVars.join(', ')}`,
      );
    }
  }

  getEnv(name: string, force: boolean = false): string {
    const value = process.env[name];
    if (force === true && !value) {
      throw new Error(`Missing environment variable: ${name}`);
    }
    return value || '';
  }
  private parseCorsOrigin(): string[] {
    const origins = this.getEnv('CORS_ORIGINS') || '*';
    return origins === '*'
      ? ['*']
      : origins.split(',').map((origin) => origin.trim());
  }

  private parseAllowedHosts(): string[] {
    const hosts = this.getEnv('ALLOWED_HOSTS');
    return hosts ? hosts.split(',').map((host) => host.trim()) : [];
  }

  private parseLogLevel(): logLevel {
    const level = (this.getEnv('LOG_LEVEL') || 'debug') as logLevel;
    const validLevels = ['debug', 'info', 'warn', 'error'];
    if (!validLevels.includes(level)) {
      return 'info';
    }
    return level as logLevel;
  }

  get Environment(): Environment {
    return (this.getEnv('NODE_ENV') || 'development') as Environment;
  }
  get isDevelopment(): boolean {
    return this.Environment === 'development';
  }
  get isProduction(): boolean {
    return this.Environment === 'production';
  }
  get isStaging(): boolean {
    return this.Environment === 'staging';
  }
  get database(): DatabaseConfig {
    return this.config.database;
  }
  get security(): securityConfig {
    return this.config.security;
  }
  get server(): serverConfig {
    return this.config.server;
  }
}
