
///<reference path='../types/qql-merge.d.ts'/>
import {mergeStrings} from 'gql-merge';
import { buildSchema } from 'graphql';
import authType from './authSchema';
import userType from './usersSchema';

const allTypes: string = mergeStrings([authType, userType]);
const schema: any = buildSchema(allTypes);

export default schema;
