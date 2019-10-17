const statusCodes = {
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

const statusMessages = {
  home: 'Welcome to the web API version 1, you may visit the documentation at /api/v1/docs',
  routeNotFound: ({ originalUrl, method }) => `Endpoint ${method} ${originalUrl} does not exist. Please, read the docs via api/v1/docs`,
  success: action => `${action} successfully`,
  created: item => `${item} created successfully`,
  noContent: () => 'No content',
  badRequest: message => `Bad request, ${message}`,
  unauthorized: action => `Access unauthorized, ${action}`,
  forbidden: 'forbidden route',
  notFound: item => `${item} Not found`,
  notAllowed: 'Method not allowed',
  conflict: message => `Conflict, ${message}`,
  serverError: () => 'internal server error',
  unavailable: action => `${action} not available`,
};

export { statusCodes, statusMessages };
