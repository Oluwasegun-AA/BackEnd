import db from '../common/requestController';

const seed: any = async (): Promise<any> => {
  const data: any = await db.PUT('/school');
  console.log('ddddddd', data)
  await db.PUT('/school/_doc/1', {
    id: '982a2372-f228-44c2-816a-3ef022e689fb',
    firstName: 'Adepoju',
    lastName: 'Oluwasegun',
    email: 'oluwasegunadepoju@gmail.com',
    username: 'shegs',
    isAdmin: true,
    verified: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now())
  });
  await db.PUT('/school/_doc/2', {
    id: '982a2372-f228-44c2-816a-3ef022e689fb',
    firstName: 'mirriam',
    lastName: 'maina',
    email: 'maina@gmail.com',
    username: 'shegs',
    isAdmin: true,
    verified: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now())
  });
  await db.PUT('/school/_doc/3', {
    id: '982a2372-f228-44c2-816a-3ef022e689fb',
    firstName: 'theo',
    lastName: 'okafor',
    email: 'okafor@gmail.com',
    username: 'shegs',
    isAdmin: true,
    verified: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now())
  });
  await db.PUT('/school/_doc/4', {
    id: '982a2372-f228-44c2-816a-3ef022e689fb',
    firstName: 'njeri',
    lastName: 'ngigi',
    email: 'njeri@gmail.com',
    username: 'shegs',
    isAdmin: true,
    verified: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now())
  });
  console.log('ElasticSearch Seeded successfully');
};

seed();
