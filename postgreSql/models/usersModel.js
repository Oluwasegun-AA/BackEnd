import uuid from 'uuid/v4';
import request from './requestController';

const getUser = async (req, res) => {
  const resp = await request.findOne(req, res, 'Users', 'id');
  return resp;
};

const getAllUsers = async (req, res) => {
  const resp = await request.findAll(res, 'Users', '');
  return resp;
};

const postUser = async (req, res) => {
  const { body } = req;
  const data = { ...body, id: uuid() };
  const resp = await request.post(req, res, 'Users', data);
  return resp;
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const resp = await request.update(
    req,
    res,
    'Users',
    `WHERE "id"='${id}'`
  );
  return resp;
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const resp = await request.delete(
    req,
    res,
    'Users',
    `WHERE "id"='${id}'`
  );
  return resp;
};

export {
  getUser,
  postUser,
  deleteUser,
  updateUser,
  getAllUsers
};
