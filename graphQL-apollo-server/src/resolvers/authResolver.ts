import Auth from '../controllers/authController';
import { IResolverLoginInput, IResolverSignupInput, IResolverAuthOutput } from '../types/typeDeclarations.interface';

const authHandler: any = {
  Mutation: {
    login: async (_parent: any, { data }: IResolverLoginInput): Promise<IResolverAuthOutput> => {
      const response = await Auth.login(data);
      return response;
    },
    signup: async (_parent: any, { data }: IResolverSignupInput): Promise<IResolverAuthOutput> => {
      const response = await Auth.signup(data);
      return response;
    }
  }
}

export default authHandler;
