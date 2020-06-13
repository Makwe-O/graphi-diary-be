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

  extend type Query {
    incidents: [Incident]!
  }
`;

export default Incident;
