const authType: string = `
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
  getUser(data: userData): User
  getAllUser: [User]!
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
