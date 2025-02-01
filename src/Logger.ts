import { DateTimeHelper } from './DateTimeHelper';

// Abstraction
interface LogTransport {
  log(message: string): void;
}

export class ConsoleTransport implements LogTransport {
  log(message: string): void {
    console.log(message);
  }
}

export class FileTransport implements LogTransport {
  constructor(private filePath: string) {}

  log(message: string): void {
    console.log(`Logging to file: ${this.filePath}  - ${message}`);
  }
}

// Main logger

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export class Logger {
  private transports: LogTransport[] = [];
  private logLevel: LogLevel = 'info';

  constructor(private context: string) {}

  addTransport(transport: LogTransport): void {
    this.transports.push(transport);
  }
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }
  private shouldLog(level: string): boolean {
    const levels = ['info', 'warn', 'error', 'debug'];
    return levels.indexOf(level) <= level.indexOf(this.logLevel);
  }

  private formatMessage(level: string, message: string): string {
    const dateTimeHelper: DateTimeHelper = new DateTimeHelper();
    const formattedDate = dateTimeHelper.format('yyyy-MM-dd HH:mm:ss');
    return `${formattedDate} [${level}] ${this.context}: ${message}`;
  }
  info(message: string): void {
    if (this.shouldLog('info')) {
      const formatted = this.formatMessage('info', message);
      this.transports.forEach((transport) => transport.log(formatted));
    }
  }
  error(message: string): void {
    if (this.shouldLog('error')) {
      const formatted = this.formatMessage('error', message);
      this.transports.forEach((transport) => transport.log(formatted));
    }
  }
}
