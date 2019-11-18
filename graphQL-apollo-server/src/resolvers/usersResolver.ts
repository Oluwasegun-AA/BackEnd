import { omit } from 'lodash';
import Users from '../controllers/usersController';
import Auth from '../controllers/authController';
import {
  IPostMutationData,
  IMutationSingleUser,
  IMutationResponseData
} from '../types/typeDeclarations.interface';
import {
  checkUserExist,
  checkUserInToken,
  checkAdminInToken
} from '../middlewares/index';


const userHandler: any = {
  Query: {
    getUser: async (
      _parent: any,
      { data }: IMutationSingleUser,
      { query, token }: any): Promise<IMutationResponseData> => {
      await checkUserInToken(token);
      await checkUserExist(data, query);
      const response: any = await Users.getUser(omit(data, ['token']));
      return response;
    },
    getAllUser: async (): Promise<IMutationResponseData[]> => {
      const response: any = await Users.getAllUsers();
      return response;
    },
  },
  Mutation: {
    updateUser: async (
      _parent: any,
      { data }: IMutationSingleUser,
      { query, token }: any): Promise<IMutationResponseData> => {
      await checkUserInToken(token);
      await checkUserExist(data, query);
      const response: Promise<any> = await Users.updateUser(omit(data, ['token']));
      return response;
    },
    deleteUser: async (
      _parent: any,
      { data }: IMutationSingleUser,
      { query, token }: any): Promise<IMutationResponseData> => {
      await checkAdminInToken(token);
      await checkUserExist(data, query);
      const response: Promise<any> = await Users.deleteUser(omit(data, ['token']));
      return response;
    },
    postUser: async (
      _parent: any,
      { data }: IPostMutationData,
      { query, token }: any): Promise<IMutationResponseData> => {
      await checkAdminInToken(token);
      await checkUserExist(data, query);
      const response: any = await Auth.signup(omit(data, ['token']));
      return response;
    },
    makeAdmin: async (
      _parent: any,
      { data }: IMutationSingleUser,
      { query, token }: any): Promise<IMutationResponseData> => {
      await checkAdminInToken(token);
      await checkUserExist(data, query);
      const response: Promise<any> = await Users.makeAdmin(omit(data, ['token']));
      return response;
    },
    verifyUser: async (
      _parent: any,
      { data }: IMutationSingleUser,
      { query }: any): Promise<IMutationResponseData> => {
      await checkUserExist(data, query);
      const response: Promise<any> = await Users.verifyUser(omit(data, ['token']));
      return response;
    }
  }
};

export default userHandler;
