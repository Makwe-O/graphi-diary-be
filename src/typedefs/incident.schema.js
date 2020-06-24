import { gql } from 'apollo-server';

const Incident = gql`
  enum IncidentType {
    RED_FLAG
    INTERVENTION
  }

  enum Status {
    DRAFT
    UNDER_INVESTIGATION
    RESOLVED
    REJECTED
  }

  type Incident {
    id: ID!
    createdAt: String!
    createdBy: User!
    type: IncidentType!
    location: String!
    status: Status!
    comment: String!
  }

  type IncidentSubscriptionPayload {
    message: String!
    data: Incident!
  }

  extend type Query {
    incidents(query: String): [Incident]!
    incident(id: ID!): Incident!
  }
  extend type Mutation {
    createIncident(data: CreateIncidentInput): Incident!
    deleteIncident(id: ID!): [Incident]!
    updateIncident(id: ID!, data: UpdateIncidentInput): Incident!
  }

  type Subscription {
    newIncident(userId: ID!): IncidentSubscriptionPayload!
    deletedIncident(userId: ID!): IncidentSubscriptionPayload!
  }

  input CreateIncidentInput {
    type: String!
    status: String!
    comment: String!
    createdBy: ID!
    location: String
    createdAt: String!
  }
  input UpdateIncidentInput {
    comment: String
    location: String
    createdAt: String
  }
`;

export default Incident;
