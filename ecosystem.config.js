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
        PORT: 4200,
        MONGO_URI: 'mongodb://localhost:27017/myuber',
        ACCESS_TOKEN_SECRET: 'MYACCESSTOKENSECRET213',
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
        MONGO_URI: 'mongodb://localhost:27017/myuber',
        ACCESS_TOKEN_SECRET: 'MYACCESSTOKENSECRET213',
      },
    },
    {
      name: 'Ride Producer',
      script: basePath + '/amqlib/src/rideProducer.ts',
      watch: '.',
      interpreter: 'node',
      interpreter_args: '-r ts-node/register',
      env: {
        RABBITMQ_URL: 'amqp://localhost:5672',
      },
    },
    {
      name: 'Ride Consumer',
      script: basePath + '/amqlib/src/rideConsumer.ts',
      watch: '.',
      interpreter: 'node',
      interpreter_args: '-r ts-node/register',
      env: {
        RABBITMQ_URL: 'amqp://localhost:5672',
      },
    },
    // {
    //   name: 'Payment',
    //   script: basePath + '/payment/src/app.ts',
    //   watch: '.',
    //   interpreter: 'node',
    //   interpreter_args: '-r ts-node/register',
    //   env: {
    //     NODE_ENV: 'development',
    //     PORT: 4700,
    //     MONGO_URI: 'mongodb://localhost:27017/myuber',
    //     ACCESS_TOKEN_SECRET: 'MYACCESSTOKENSECRET213',
    //   },
    // },
  ],
};
