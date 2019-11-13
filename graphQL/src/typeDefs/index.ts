
import { buildSchema } from 'graphql';
import authType from './authSchema';

const schema: any = buildSchema(authType);

export default schema;
