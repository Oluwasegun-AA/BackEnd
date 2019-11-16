import { QueryInterface } from 'sequelize';
import { Password } from '../../helpers';

export default {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('Users', [
    {
      id: '982a2372-f228-44c2-816a-3ef022e689fb',
      firstName: 'Adepoju',
      lastName: 'Oluwasegun',
      email: 'oluwasegunadepoju@gmail.com',
      password: Password.encrypt('password'),
      username: 'shegs',
      isAdmin: true,
      verified: true,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: 'bbfa728f-f15b-4fc3-8a29-558236bb1008',
      firstName: 'Njeri',
      lastName: 'Ngigi',
      email: 'njeri@gmail.com',
      password: Password.encrypt('password'),
      username: 'shalon',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: 'd90f0e39-b5da-4377-8e33-b0f531414e6b',
      firstName: 'Mirriam',
      lastName: 'Maina',
      email: 'mirriam@gmail.com',
      password: Password.encrypt('password'),
      username: 'mirriam',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: '1cf63969-6250-452e-9ae0-fa1dceca4ba5',
      firstName: 'Theo',
      lastName: 'Okafor',
      email: 'theo@gmail.com',
      password: Password.encrypt('password'),
      username: 'theo',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: '6f13dcd6-49f0-4fba-a415-636b41c42888',
      firstName: 'Eric',
      lastName: 'Ebulu',
      email: 'eric@gmail.com',
      password: Password.encrypt('password'),
      username: 'eric',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: '4cfd7015-7176-4e88-be1a-875f2e808646',
      firstName: 'Kasule',
      lastName: 'Joseph',
      email: 'kasule@gmail.com',
      password: Password.encrypt('password'),
      username: 'kasule',
      isAdmin: false,
      verified: false,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
  ]),
  down: (queryInterface: any) => queryInterface.bulkDelete('Users', null, {
    returning: true
  })
};
