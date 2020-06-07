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
  }

  type Query {
    users: [User]
  }
`;

export default User;
