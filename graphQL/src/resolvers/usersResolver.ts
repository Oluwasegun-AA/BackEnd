import User from '../controllers/usersController';
import Auth from '../controllers/authController';

interface IUser {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface IUserData {
  data: IUser;
}

interface IResponseData {
  message: string;
  data: {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface ISingleUser {
  data: {
    id: string;
    email?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  }
}

const userHandler: any = {
  getUser: async ({ data }: ISingleUser): Promise<IResponseData> => {
    const response: Promise<any> = await User.getUser(data);
    return response;
  },
  getAllUser: async (): Promise<IResponseData[]> => {
    const response: Promise<any> = await User.getAllUsers();
    return response;
  },
  updateUser: async ({ data }: ISingleUser): Promise<IResponseData> => {
    const response: Promise<any> = await User.updateUser(data);
    return response;
  },
  deleteUser: async ({ data }: ISingleUser): Promise<IResponseData> => {
    const response: Promise<any> = await User.deleteUser(data);
    return response;
  },
  postUser: async ({ data }: IUserData): Promise<IResponseData> => {
    const response: Promise<any> = Auth.signup(data);
    return response;
  },
  makeAdmin: async ({ data }: ISingleUser): Promise<IResponseData> => {
    const response: Promise<any> = await User.makeAdmin(data);
    return response;
  },
  verifyUser: async ({ data }: ISingleUser): Promise<IResponseData> => {
    const response: Promise<any> = await User.verifyUser(data);
    return response;
  }
}

export default userHandler;
