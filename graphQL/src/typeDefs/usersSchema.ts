const authType: string  = `
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


type Query {
  getUser(id: ID): User
  getUsers(): [User!]
}

type Mutation {
  updateUser(data: LoginData): AuthResponse
  deleteUser(data: SignupData): AuthResponse
  postUser(data: SignupData): AuthResponse
  makeAdmin(data: SignupData): AuthResponse
  verifyUser(data: SignupData): AuthResponse
}
`;

export default authType;
