import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';
// import schema from '';
// import rootResolver from '';

// _db mocks out a simple database
const _db = {
  users: [
    {
      id: 1,
      name: "John Doe"
    }
  ],
  posts: [
    {
      userId: 1,
      text: "Hello World! This is my first post."
    }
  ]
}
// userHandler mocks out a simple ORM
const userHandler = {
  getUser(id: number): any {
    for (let i = 0; i < _db.users.length; i++) {
      if(_db.users[i].id === id) {
        return _db.users[i];
      }
    }
  },
  getPosts(userId: number) {
    const userPosts = [];
    for (let i = 0; i < _db.posts.length; i++) {
      if (_db.posts[i].userId === userId) {
        userPosts.push(_db.posts[i]);
      }
    }
    return userPosts;
  }
}
const schema = buildSchema(`
  type Post {
    text: String
  }
  type User {
    name: String
    posts: [Post]
  }
  type Query {
    user(id: Int!): User
  }
`);
const rootResolver = {
  user: (args: any) => {
    const userId: number = args.id;
    const user: any = userHandler.getUser(userId);
    console.log(userHandler.getUser(userId));
    const posts: any = userHandler.getPosts(userId);
    return {
      name: user.name,
      posts
    };
  }
};

const serverMiddleWares = (app: any) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger('common'));
  app.use('/user', expressGraphQL({
    schema,
    rootValue: rootResolver,
    graphiql: true,
  }));
};

export default serverMiddleWares;
