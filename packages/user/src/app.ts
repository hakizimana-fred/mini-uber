import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
//import { validatePort } from '@myuber/utils';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { validatePort } from '../../utils/src';

import { appConfig } from './config/app.config';
import { connectDB } from './config/db';
import { resolvers } from './data/resolvers/resolver';
import { typeDefs } from './data/schema/schema';

const mongoURI =
  process.env.MONGO_URI ||
  'mongodb://root:example@mongodb:27017/myuber?authSource=admin';

const port = validatePort((process.env.PORT as string) || 3000);
const app: Application = express();

const main = async () => {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    cors() as any,
    express.json({ limit: '10mb' }),
    helmet(),
    morgan('dev'),
    compression(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    }) as any
  );

  // connect to DB
  connectDB(mongoURI).then(async () => {
    await new Promise((resolve: any) =>
      httpServer.listen({ port: appConfig.port }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:${appConfig.port}`);
  });

  const shutdown = async () => {
    console.log('Shutting down server...');
    await server.stop();
    httpServer.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

main().catch((err) => {
  if (err instanceof Error) {
    process.exit(1);
  }
});
