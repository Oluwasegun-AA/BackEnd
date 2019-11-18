interface ILoginData {
  username?: string;
  email?: string;
  password: string;
}

interface ISignupData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ISingleUserDataValues {
  dataValues: {
    id: string;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
  }
}

interface ISingleUser {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IGetUser {
  id?: string;
  email?: string;
  username?: string;
}

interface IUpdateUser {
  id?: string;
  email?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

interface IJwtData {
  id: string;
  isAdmin: boolean;
  verified: boolean;
};

interface IStatusCodes {
  success: number;
  created: number;
  noContent: number;
  badRequest: number;
  unauthorized: number;
  forbidden: number;
  notFound: number;
  notAllowed: number;
  conflict: number;
  serverError: number;
  unavailable: number;
};

interface IStatusMessages {
  home: string;
  success: (action: string) => string;
  created: (item: string) => string;
  noContent: () => string;
  badRequest: (message: string) => string;
  unauthorized: (action: string) => string;
  forbidden: string;
  notFound: (item: string) => string;
  notAllowed: string;
  conflict: (message: string) => string;
  unavailable: (action: string) => string;
  routeNotFound: ({ originalUrl, method }: IMethod) => string;
  serverErrorMessage: () => string;
};

interface IMethod {
  originalUrl: string;
  method: string;
};

interface IResolverLoginInput {
  data: {
    email?: string;
    username?: string;
    password: string;
  }
};

interface IResolverSignupInput {
  data: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  };
};

interface IResolverAuthOutput {
  token: string;
}


interface IPostMutationData {
  data: ISignupData;
}

interface IMutationResponseData {
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

interface IMutationSingleUser {
  data: {
    id: string;
    email?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  };
}

export {
  IResolverLoginInput,
  IResolverSignupInput,
  IResolverAuthOutput,
  IPostMutationData,
  IMutationResponseData,
  IMutationSingleUser,
  ILoginData,
  ISignupData,
  ISingleUserDataValues,
  ISingleUser,
  IGetUser,
  IUpdateUser,
  IJwtData,
  IStatusCodes,
  IStatusMessages,
  IMethod
};
