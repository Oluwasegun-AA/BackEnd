import express from 'express';

import { catchAllError } from '../helpers';
import FeedController from '../controllers/FeedController';

const feeds = express.Router();
const { get, post } = FeedController;


feeds.get('/', get);

feeds.post('/', post);

catchAllError(feeds);

export default feeds;
