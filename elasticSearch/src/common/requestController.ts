import axios from 'axios';

export const baseUrl = 'http://localhost:9200/';

const request = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

request.interceptors.request.use(
  (config: any) => {
    // config.headers['x-access-token'] = localStorage.getItem('token');
    return config;
  },
  (error: any) => Promise.reject(error)
);

const handleRequest = async (method: any, route: string, data: string | any = null): Promise<any> => {
  try {
    const response = await request[method](route, data);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
}
export const GET: any = async (route: string): Promise<any> => {
  const response = await handleRequest('get', route);
  return response;
};

export const POST: any = async (route: string, data: any): Promise<any> => {
  const response = await handleRequest('post', route, data);
  return response;
};

export const PUT: any = async (route: string, data: any): Promise<any> => {
  const response = await handleRequest('put', route, data);
  return response;
};

export const DELETE: any = async (route: string, data: any): Promise<any> => {
  const response = await handleRequest('delete', route, data);
  return response;
};

export default {
  GET,
  POST,
  PUT,
  DELETE
};
