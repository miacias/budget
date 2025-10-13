import chalk from 'chalk';

// Define color themes
export const themes = {
  // Status colors
  success: chalk.green,
  error: chalk.bold.red,
  warning: chalk.hex('#FFA500'), // Orange
  info: chalk.blue,
  debug: chalk.gray,
  
  // Database colors
  database: chalk.cyanBright,
  dbSuccess: chalk.green.bold,
  dbError: chalk.red.bold,
  
  // Server colors
  server: chalk.blue,
  serverSuccess: chalk.green,
  serverError: chalk.red,
  
  // HTTP status colors
  http200: chalk.green,
  http300: chalk.yellow,
  http400: chalk.hex('#FFA500'), // Orange
  http500: chalk.red,
  
  // Special formatting
  highlight: chalk.yellow.bold,
  emphasis: chalk.bold,
  muted: chalk.dim,
  url: chalk.underline.blue,
  
  // Custom brand colors
  primary: chalk.hex('#007ACC'),
  secondary: chalk.hex('#6C757D'),
  accent: chalk.hex('#28A745'),
};

// Predefined logging functions
export const logger = {
  success: (message: string) => console.log(themes.success(`✅ ${message}`)),
  error: (message: string) => console.error(themes.error(`❌ ${message}`)),
  warning: (message: string) => console.warn(themes.warning(`⚠️  ${message}`)),
  info: (message: string) => console.log(themes.info(`ℹ️  ${message}`)),
  debug: (message: string) => console.log(themes.debug(`🐛 ${message}`)),
  
  // Database specific logs
  db: {
    connect: (message: string) => console.log(themes.database(`🔗 ${message}`)),
    success: (message: string) => console.log(themes.dbSuccess(`✅ DB: ${message}`)),
    error: (message: string) => console.error(themes.dbError(`❌ DB: ${message}`)),
  },
  
  // Server specific logs
  server: {
    start: (port: number) => console.log(themes.server(`🚀 Server running on port: ${themes.url(`http://localhost:${port}`)}`)),
    error: (message: string) => console.error(themes.serverError(`🔥 Server Error: ${message}`)),
    request: (method: string, path: string, status: number) => {
      const statusColor = status >= 500 ? themes.http500 : 
                         status >= 400 ? themes.http400 : 
                         status >= 300 ? themes.http300 : themes.http200;
      console.log(`${themes.muted(method)} ${path} ${statusColor(status.toString())}`);
    },
  },
};

/**
 * Export chalk instance and themes for custom usage
 * {@see https://www.npmjs.com/package/chalk | chalk docs}
 */
export { chalk };
export default themes;