import express from 'express';
import dotenv from 'dotenv';
import { connectionMessage } from '../helpers';

dotenv.config();
const app = express();

app.listen(port, connectionMessage(port));
