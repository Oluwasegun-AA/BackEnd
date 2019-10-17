import express from 'express';
import dotenv from 'dotenv';

import router from '../routes';
import { catchAllError, connectionMessage } from '../helpers';
import serverMiddleWares from '../middlewares/serverMiddlewares';

dotenv.config();
const app = express();
const { PORT } = process.env;

serverMiddleWares(app);

app.use('/api/v1', router);

catchAllError(app);

app.listen(PORT, connectionMessage(PORT));
