const path = require('path');
const { env } = require('process');
const basePath = path.join(__dirname, 'packages');

module.exports = {
  apps: [
    // API Gateway Service
    {
      name: 'User',
      script: basePath + '/user/src/app.ts',
      watch: '.',
      interpreter: 'node',
      interpreter_args: '-r ts-node/register',
      env: {
        NODE_ENV: 'development',
        PORT: 4000,
      },
    },
    {
      name: 'Ride',
      script: basePath + '/ride/src/app.ts',
      watch: '.',
      interpreter: 'node',
      interpreter_args: '-r ts-node/register',
      env: {
        NODE_ENV: 'development',
        PORT: 4500,
      },
    },
  ],
};
