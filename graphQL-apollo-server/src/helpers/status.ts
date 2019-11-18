import {IStatusCodes, IStatusMessages, IMethod} from '../types/typeDeclarations.interface';

const statusCodes: IStatusCodes | any= {
  success: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  notAllowed: 405,
  conflict: 409,
  serverError: 500,
  unavailable: 503,
};

const statusMessages: IStatusMessages | any = {
  home: 'Welcome to the web API version 1, you may visit the documentation at /api/v1/docs',
  routeNotFound: ({ originalUrl, method }: IMethod) => `Endpoint ${method} ${originalUrl} does not exist. Please, read the docs via api/v1/docs`,
  success: (action: string) => `${action} successfully`,
  created: (item: string) => `${item} created successfully`,
  noContent: () => 'No content',
  badRequest: (message: string) => `Bad request; ${message}`,
  unauthorized: (action: string) => `Access unauthorized; ${action}`,
  forbidden: 'forbidden route',
  notAllowed: 'Method not allowed',
  notFound: (item: string) => `${item} Not found`,
  conflict: (message: string) => `Conflict, ${message}`,
  serverErrorMessage: () => 'internal server error',
  unavailable: (action: string) => `${action} not available`,
};

const status = {
  success: 'success',
  created: 'created',
  noContent: 'noContent',
  badRequest: 'badRequest',
  unauthorized: 'unauthorized',
  forbidden: 'forbidden',
  notFound: 'notFound',
  notAllowed: 'notAllowed',
  conflict: 'conflict',
  serverError: 'serverError',
  unavailable: 'unavailable',
}

export { statusCodes, statusMessages, status };
