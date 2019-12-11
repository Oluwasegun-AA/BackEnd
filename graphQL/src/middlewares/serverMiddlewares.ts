import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressGraphQL from 'express-graphql';
import schema from '../typeDefs';
import rootResolver from '../resolvers';
import { formatResponse } from '../helpers';

const serverMiddleWares = (app: any) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger('common'));
  app.use('/users', expressGraphQL({
    schema,
    rootValue: rootResolver,
    graphiql: true,
    formatError: (error: any) => {
      return formatResponse(error.message);
    }
  }));
};

export default serverMiddleWares;
