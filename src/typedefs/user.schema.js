import { gql } from 'apollo-server';

const User = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    isAdmin: Boolean!
    phonenumber: String!
    incidents: [Incident!]!
  }

  type Query {
    users(query: String): [User!]!
    user(username: String!): User!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): [User]!
    updateUser(id: ID!, data: UpdateUserInput): User!
  }

  input CreateUserInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    phonenumber: String
  }
  input UpdateUserInput {
    firstname: String
    lastname: String
    phonenumber: String
  }
`;

export default User;
