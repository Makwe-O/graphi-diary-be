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
`;

export default User;
