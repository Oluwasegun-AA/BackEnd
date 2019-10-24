import express from 'express';

import { catchAllError } from '../helpers';
import { FeedsController } from '../controllers';

const feeds = express.Router();
const { getFeeds } = FeedsController;

feeds.get('/', getFeeds);

catchAllError(feeds);

export default feeds;
