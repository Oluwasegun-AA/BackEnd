import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

const serverMiddleWares = app => {
  app.use(cors());
  app.use(logger('common'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
};

export default serverMiddleWares;
