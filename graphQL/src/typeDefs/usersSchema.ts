const authType: string = `
type User {
  id: ID!
  email: String!
  username: String!
  firstName: String!
  lastName: String!
  isAdmin: Boolean!
  verified: Boolean!
  createdAt: String!
  updatedAt: String!
}

type Response {
  message: String
  data: {
  id: ID!
  email: String!
  username: String!
  firstName: String!
  lastName: String!
  isAdmin: Boolean!
  verified: Boolean!
  createdAt: String!
  updatedAt: String!
  }
}

input userData {
  email: String
  username: String
  password: String
  firstName: String
  lastName: String
  isAdmin: Boolean
  verified: Boolean
}

type Query {
  getUser(data: userData): User
  getUsers(): [User!]
}

type Mutation {
  updateUser(data: userData): User
  deleteUser(data: userData): User
  postUser(data: userData): User
  makeAdmin(data: userData): User
  verifyUser(data: userData): User
}
`;

export default authType;
