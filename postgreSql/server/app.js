import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import bodyParser from 'body-parser';

import router from '../routes';
import { connectionMessage } from '../helpers';
import { catchAllError }  from '../helpers';

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

catchAllError(app)

app.listen(PORT, connectionMessage(PORT));
