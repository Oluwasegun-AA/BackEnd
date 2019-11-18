import db from '../sequelize/models';
import { isEmpty } from 'lodash';

import {
  Jwt,
  statusMessages,
} from '../helpers';

const { Users } = db;
const Op = db.Sequelize.Op;

const checkUserExist = async ({ email, id, username }: any, query: string) => {
  const data = await Users.findOne({ where: {
    [Op.or]: [
      { email: email || null },
      { id: id || null },
      { username: username || null }
    ]}});
  if (!isEmpty(data) && query.includes('signup')) {
    throw new Error('User Already signed up');
  };
  if (isEmpty(data) && query.includes('login')) {
    throw new Error(statusMessages.notFound('User'));
  };
  if (isEmpty(data)) {
    throw new Error(statusMessages.notFound('User'));
  };
};

const checkUserInToken = async (token: string) => {
  const data: any = await Jwt.decrypt(token);
  const user: any = await Users.findOne({ where: { id: data.id } });
  if (isEmpty(data) || isEmpty(user) || (data.id !== user.id)) {
    throw new Error('Invalid Token');
  };
};

const checkAdminInToken = async (token: string) => {
  const data: any = await Jwt.decrypt(token);
  const user: any = await Users.findOne({ where: { id: data.id } });
  if (!user.isAdmin) {
    throw new Error('Unauthorized user Token');
  };
  if (isEmpty(data) || isEmpty(user)) {
    throw new Error('Invalid Token');
  };
};

export {
  checkUserExist,
  checkUserInToken,
  checkAdminInToken,
};
