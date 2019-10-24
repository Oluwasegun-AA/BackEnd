import request from './requestController';
import { extractValues } from '../helpers';

const findUser = async (req, res) => {
  const resp = await request.findOne(req, res, 'Users', 'email');
  return resp;
};

const postUser = async (req, res) => {
  const values = extractValues.userSignup(req);
  const resp = await request.post(req, res, 'Users', values);
  return resp;
};

const findAllUsers = async (req, res) => {
  const resp = await request.findAll(res, '"Users"');
  return resp;
};

const findAllAdmins = async (req, res) => {
  const resp = await request.findAll(res, '"Users"', 'WHERE role="Admin"');
  return resp;
};

export {
  findUser,
  findAllUsers,
  findAllAdmins,
  postUser
};
