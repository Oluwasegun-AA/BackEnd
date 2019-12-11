
import { buildSchema } from 'graphql';

const schema: any = buildSchema(`
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

export default schema;
