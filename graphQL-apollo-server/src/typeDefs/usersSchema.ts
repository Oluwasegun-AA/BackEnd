import { gql } from 'apollo-server-express';

const authType = gql`
type User {
  id: String!
  email: String!
  username: String!
  firstName: String!
  lastName: String!
  isAdmin: Boolean!
  verified: Boolean!
  createdAt: String!
  updatedAt: String!
}

input tokenedUser {
  token: String
  id: String
  email: String
  username: String
  firstName: String
  lastName: String
  isAdmin: Boolean
  verified: Boolean
}

input userData {
  id: String
  email: String
  username: String
  firstName: String
  lastName: String
  isAdmin: Boolean
  verified: Boolean
}

 type Query {
  getUser(data: tokenedUser): User
  getAllUser: [User]!
}

 extend type Mutation {
  updateUser(data: tokenedUser): User
  deleteUser(data: tokenedUser): User
  postUser(data: tokenedUser): User
  makeAdmin(data: tokenedUser): User
  verifyUser(data: tokenedUser): User
}
`;

export default authType;
