import Users from '../controllers/usersController';
import Auth from '../controllers/authController';
import { IPostMutationData, IMutationSingleUser, IMutationResponseData } from '../types/typeDeclarations.interface';

const userHandler: any = {
  Query: {
    getUser: async (_parent: any, {data}: IMutationSingleUser): Promise<IMutationResponseData> => {
      const response: any = await Users.getUser(data);
      return response;
    },
    getAllUser: async (): Promise<IMutationResponseData[]> => {
      const response: any = await Users.getAllUsers();
      return response;
    },
  },
  Mutation: {
    updateUser: async (_parent: any, { data }: IMutationSingleUser): Promise<IMutationResponseData> => {
      const response: Promise<any> = await Users.updateUser(data);
      return response;
    },
    deleteUser: async (_parent: any, { data }: IMutationSingleUser): Promise<IMutationResponseData> => {
      const response: Promise<any> = await Users.deleteUser(data);
      return response;
    },
    postUser: async (_parent: any, { data }: IPostMutationData): Promise<IMutationResponseData> => {
      const response: Promise<any> = Auth.signup(data);
      return response;
    },
    makeAdmin: async (_parent: any, { data }: IMutationSingleUser): Promise<IMutationResponseData> => {
      const response: Promise<any> = await Users.makeAdmin(data);
      return response;
    },
    verifyUser: async (_parent: any, { data }: IMutationSingleUser): Promise<IMutationResponseData> => {
      const response: Promise<any> = await Users.verifyUser(data);
      return response;
    }
  }
};

export default userHandler;
