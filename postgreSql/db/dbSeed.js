import uuid from 'uuid/v4';

import { Password } from '../helpers';
import query from './dbSetup';

const seedDb = async () => {
  const dropTables = 'DROP TABLE IF EXISTS "Users", "Articles", "Comments", "Feeds", "Tags"; DROP TYPE IF EXISTS "RoleEnum", "TagEnum" CASCADE;';
  const rolesEnum = "CREATE TYPE \"RoleEnum\" AS ENUM ('User', 'Admin');";
  const tagsEnum =
    "CREATE TYPE \"TagEnum\" AS ENUM ('News', 'Science', 'General', 'Music', 'Gossip', 'Education', 'Sport', 'Fashion');";
  const userTable = `CREATE TABLE IF NOT EXISTS "Users"(
        id uuid PRIMARY KEY NOT NULL UNIQUE,
        username varchar(255) NOT NULL UNIQUE,
        "firstName" varchar(255) NOT NULL,
        "lastName" varchar(255) NOT NULL,
        email varchar(255) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        role "RoleEnum" DEFAULT 'User',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
      );`;
  const articles = `CREATE TABLE IF NOT EXISTS "Articles"(
        id uuid PRIMARY KEY NOT NULL UNIQUE,
        slug varchar(50) NOT NULL UNIQUE,
        description varchar(255) NOT NULL,
        body varchar(255) NOT NULL,
        "tagId" uuid NOT NULL,
        "authorId" uuid NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
      );`;

  const tags = `CREATE TABLE IF NOT EXISTS "Tags"(
        id uuid PRIMARY KEY NOT NULL UNIQUE,
        name "TagEnum" DEFAULT 'General',
        "createdAt" TIMESTAMP DEFAULT NOW()
      );`;

  const comments = `CREATE TABLE IF NOT EXISTS "Comments"(
      id uuid PRIMARY KEY NOT NULL UNIQUE,
      body varchar(255) NOT NULL,
      "authorId" uuid NOT NULL,
      "articleId" uuid NOT NULL,
      "createdAt" TIMESTAMP DEFAULT NOW(),
      "updatedAt" TIMESTAMP DEFAULT NULL
      );`;

  const createUser = `INSERT INTO "Users" (id, username,"firstName", "lastName", email, password, role)
      VALUES ('${uuid()}', 'User', 'test', 'user', 'user@email.com', '${Password.encrypt('password')}', 'User'),
      ('${uuid()}', 'Admin', 'test', 'admin', 'admin@email.com', '${Password.encrypt('password')}', 'Admin'),
      ( '${uuid()}', 'test', 'admin', 'user', 'test@email.com', '${Password.encrypt('password')}', 'User');`;

  const createArticles = `INSERT INTO "Articles" (id, slug, description, body, "tagId", "authorId")
      VALUES ('${uuid()}','this-is-the-first-article', 'the first article', 'The article of the century, this is just a demo', '${uuid()}', '${uuid()}'),
       ('${uuid()}','this-is-the-second-article', 'the second article', 'The article of the millennium, this is just another demo', '${uuid()}', '${uuid()}'),
       ('${uuid()}','this-is-a-test', 'the is a test article', 'Once upon a time in the history of earth', '${uuid()}', '${uuid()}');`;

  const createTags = `INSERT INTO "Tags" (id, name) VALUES ('${uuid()}','News'),('${uuid()}','Science'),('${uuid()}','General'),('${uuid()}','Music'),('${uuid()}','Gossip'),('${uuid()}','Education'),('${uuid()}','Sport'),('${uuid()}','Fashion');`;

  const createComments = `INSERT INTO "Comments" (id,body,"authorId","articleId")
       VALUES ('${uuid()}','this is insightful', '${uuid()}', '${uuid()}'),
        ('${uuid()}','I love the way you made this article comprehensive', '${uuid()}', '${uuid()}'),
        ('${uuid()}','Nice one kudos to you', '${uuid()}', '${uuid()}');`;

  const initializeTables =
    dropTables +
    rolesEnum +
    tagsEnum +
    userTable +
    articles +
    tags +
    comments +
    createUser +
    createArticles +
    createTags +
    createComments;

  await query(initializeTables);
};

const initializeDb = async () => {
  try {
    await seedDb();
  } catch (err) {
    process.stdout.write(`${err}\n`);
  }
  process.stdout.write('All Tables created successfully!\n');
};

initializeDb();
