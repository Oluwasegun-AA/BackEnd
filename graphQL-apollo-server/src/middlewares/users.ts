import db from '../sequelize/models';
import { isEmpty } from 'lodash';
import { IGetUser } from '../types/typeDeclarations.interface';

import {
  Jwt,
  statusMessages,
} from '../helpers';

const { Users } = db;
const Op = db.Sequelize.Op;

const checkUserExist = async ({ email, id, username }: IGetUser, query: string) => {
  const data = await Users.findOne({
    where: {
      isDeleted: false,
      [Op.or]: [
        { email: email || null },
        { id: id || null },
        { username: username || null }
      ]
    }
  });
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
  const user: any = await Users.findOne({ where: { id: data.id, isDeleted: false } });
  if (isEmpty(data) || isEmpty(user) || (data.id !== user.id)) {
    throw new Error('Invalid Token');
  };
};

const checkUserOwnsAccount = async ({ email, id, username }: IGetUser, token: string) => {
  const data: any = await Jwt.decrypt(token);
  const user: any = await Users.findOne({ where: { id: data.id, isDeleted: false } });
  const response: any = await Users.findOne({
    where: {
      [Op.or]: [
        { email: email || null },
        { id: id || null },
        { username: username || null }
      ]
    }
  });

  if ((data.id !== user.id || response.id !== user.id) && !user.isAdmin) {
    throw new Error('User unauthorized, Token not authorized');
  };
};

const checkAdminInToken = async (token: string) => {
  const data: any = await Jwt.decrypt(token);
  const user: any = await Users.findOne({ where: { id: data.id, isDeleted: false } });
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
  checkUserOwnsAccount
};
