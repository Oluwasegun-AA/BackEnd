const authType: string  = `
input SignupData {
  username: String!
  password: String!
  email: String!
  firstName: String!
  lastName: String!
}

input LoginData {
  email: String!
  password: String!
}

type test {
  email: String!
  password: String!
}

type Token {
  token: String
}

type AuthResponse {
  data: Token
}

type Query {
  auth(data: LoginData): test
  users(data: LoginData): test
}

type Mutation {
  login(data: LoginData): AuthResponse
  signup(data: SignupData): AuthResponse
}
`;

export default authType;
