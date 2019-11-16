import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressGraphQL from 'express-graphql';
import schema from '../typeDefs';
import rootValue from '../resolvers';
import { ResponseHandler } from '../helpers';

const serverMiddleWares = (app: any) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger('common'));
  app.use('/users', expressGraphQL({
    schema,
    rootValue,
    context: async ({ req, res }: any) => {
      return { req, res };
    },
    graphiql: true,
    customFormatErrorFn: (error: any) => ResponseHandler.error(error.message),
    pretty: true
  }));
};

export default serverMiddleWares;
