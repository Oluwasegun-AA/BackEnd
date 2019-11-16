import Auth from '../controllers/authController';

interface ILogindata {
  data: {
    email?: string;
    username?: string;
    password: string;
  }
}

interface ISignupdata {
  data: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }
}

const authHandler: any = {
  login: async ({ data }: ILogindata): Promise<any> => {
    const response = await Auth.login(data);
    return response;
  },
  signup: async ({ data }: ISignupdata): Promise<any> => {
    const response = await Auth.signup(data);
    return response;
  }
}

export default authHandler;
