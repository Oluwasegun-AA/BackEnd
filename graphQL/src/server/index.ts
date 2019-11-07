import express from 'express';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';
import dotenv from 'dotenv'

const app = express();
dotenv.config();
const { PORT } = process.env;
