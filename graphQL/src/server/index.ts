import dotenv from 'dotenv';
import express from 'express';
import serverMiddleWares from '../middlewares/serverMiddlewares';
// import { connectionMessage } from '../helpers';

const app: any = express();
dotenv.config();
const { PORT }: any = process.env;

serverMiddleWares(app);

// catchAllError(app);

app.listen(PORT);
