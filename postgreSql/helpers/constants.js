const statusCodes = {
  success: {
    code: 200,
    message: (action) => `${action} successfully`
  },
  created: {
    code: 201,
    message: (action) => `${item} created successfully`
  },
  noContent: {
    code: 204,
    message: (action) => 'No content'
  },
  badRequest: {
    code: 400,
    message: (message) => `Bad request, ${message}`
  },
  unauthorized: {
    code: 401,
    message: (action) => `Access unauthorized, ${action}`
  },
  forbidden: {
    code: 403,
    message: 'forbidden route'
  },
  notFound: {
    code: 404,
    message: (item) => `${item} Not found`
  },
  notFound: {
    code: 405,
    message: 'Method not allowed'
  },
  conflict: {
    code: 409,
    message: (message) => `Conflict, ${message}`
  },
  serverError: {
    code: 500,
    message: (action) => 'internal server error'
  },
  unavailable: {
    code: 503,
    message: (action) => `${action} not available`
  }
};

export {
  statusCodes
};
