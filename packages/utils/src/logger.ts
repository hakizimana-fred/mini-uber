import chalk from 'chalk';

const getTimeStamp = () => new Date().toISOString();

export const logger = {
  error(...args: any[]) {
    console.error(chalk.red(`[ERROR] [${getTimeStamp()}]`), ...args);
  },
  warn(...args: any[]) {
    console.warn(chalk.yellow(`[WARN] [${getTimeStamp()}]`), ...args);
  },
  info(...args: any[]) {
    console.info(chalk.cyan(`[INFO] [${getTimeStamp()}]`), ...args);
  },
  success(...args: string[]) {
    console.log(chalk.green(`[SUCCESS] [${getTimeStamp()}]`), ...args);
  },
  debug(...args: any[]) {
    if (process.env.DEBUG === 'true') {
      console.debug(chalk.magenta(`[DEBUG] [${getTimeStamp()}]`), ...args);
    }
  },
};

export default logger;
