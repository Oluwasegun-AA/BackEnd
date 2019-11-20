///<reference path='../types/apollo-server-express.d.ts'/>
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { catchAllError, ResponseHandler, connectionMessage } from '../helpers';
import typeDefs from '../typeDefs';
import resolvers from '../resolvers';

dotenv.config();
const { PORT }: any = process.env;
const app = express();

app.use(cors());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: any) => {
    const { body: { query }, headers: { token } } = req;
    return { query, token };
  },
  formatError: (err: any) => ResponseHandler.error(err.message)
});

server.applyMiddleware({ app, path: '/users' });

catchAllError(app);

// for apps simply containing grapgql endpoints and nothing else, use 👇🏽
// server.listen({ port: PORT }).then(({ url }: any) => connectionMessage(url));

// for graphql endpoint baked on prexisting express apps, use 👇🏽
app.listen(PORT, () => connectionMessage(PORT));
