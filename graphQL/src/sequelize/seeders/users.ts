import { QueryInterface } from 'sequelize';
import uuid from 'uuid/v4';
import { Password } from '../../helpers';

export default {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('Users', [
    {
      id: uuid(),
      firstName: 'Adepoju',
      lastName: 'Oluwasegun',
      email: 'oluwasegunadepoju@gmail.com',
      password: Password.encrypt('password'),
      username: 'shegs',
      isAdmin: true,
      verified: true,
      createdAt: new Date(Date.now())
    },
    {
      id: uuid(),
      firstName: 'Njeri',
      lastName: 'Ngigi',
      email: 'njeri@gmail.com',
      password: Password.encrypt('password'),
      username: 'shalon',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now())
    },
    {
      id: uuid(),
      firstName: 'Mirriam',
      lastName: 'Maina',
      email: 'mirriam@gmail.com',
      password: Password.encrypt('password'),
      username: 'mirriam',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now())
    },
    {
      id: uuid(),
      firstName: 'Theo',
      lastName: 'Okafor',
      email: 'theo@gmail.com',
      password: Password.encrypt('password'),
      username: 'theo',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now())
    },
    {
      id: uuid(),
      firstName: 'Eric',
      lastName: 'Ebulu',
      email: 'eric@gmail.com',
      password: Password.encrypt('password'),
      username: 'eric',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now())
    },
    {
      id: uuid(),
      firstName: 'Kasule',
      lastName: 'Joseph',
      email: 'kasule@gmail.com',
      password: Password.encrypt('password'),
      username: 'kasule',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now())
    },
  ]),
  down: (queryInterface: any) => queryInterface.bulkDelete('Users', null, {
    returning: true
  })
};
