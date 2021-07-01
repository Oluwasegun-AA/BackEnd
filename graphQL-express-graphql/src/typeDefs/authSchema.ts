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

type Mutation {
  login(data: LoginData): Token
  signup(data: SignupData): Token
}
`;

export default authType;
