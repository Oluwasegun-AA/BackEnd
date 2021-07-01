import Auth from '../controllers/authController';
import {IResolverLoginInput, IResolverSignupInput, IResolverAuthOutput} from '../types/typeDeclarations.interface';

const authHandler: any = {
  login: async ({ data }: IResolverLoginInput): Promise<IResolverAuthOutput> => {
    const response = await Auth.login(data);
    return response;
  },
  signup: async ({ data }: IResolverSignupInput): Promise<IResolverAuthOutput> => {
    const response = await Auth.signup(data);
    return response;
  }
}

export default authHandler;
