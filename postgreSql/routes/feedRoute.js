import express from 'express';

import { catchAllError } from '../helpers';
import FeedController from '../controllers/feedController';

const feeds = express.Router();
const { get } = FeedController;


feeds.get('/', get);

catchAllError(feeds);

export default feeds;
