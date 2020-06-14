import { v4 as uuidv4 } from 'uuid';
let userData = [
  {
    id: '234',
    firstname: 'Mmakwe',
    lastname: 'Onyeka',
    username: 'notmaks',
    email: 'mmakeonyeka@gmail.com',
    isAdmin: true,
    phonenumber: '08034553555',
  },
  {
    id: '2344',
    firstname: 'Bolanle',
    lastname: 'Banks',
    username: 'beatice33',
    email: 'banks@hotmail.com',
    isAdmin: true,
    phonenumber: '07094375899',
  },
];

let incidentData = [
  {
    id: '112',
    createdAt: '23-33-22',
    createdBy: '234',
    type: 'INCIDENT',
    location: 'lagos',
    status: 'PENDING',
    comment: 'It was lit',
  },
  {
    id: '113',
    createdAt: '23-33-21',
    createdBy: '234',
    type: 'INCIDENT',
    location: 'lagos',
    status: 'PENDING',
    comment: 'Thing thing go skrreee',
  },
  {
    id: '114',
    createdAt: '24-33-21',
    createdBy: '234',
    type: 'INCIDENT',
    location: 'lagos',
    status: 'PENDING',
    comment: 'She belongs to the streets',
  },
];

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      if (!args.query) {
        return userData;
      }
      return userData.filter((user) =>
        user.username
          .toLocaleLowerCase()
          .includes(args.query.toLocaleLowerCase()),
      );
    },
    user(parent, args, context, info) {
      const result = userData.find((user) => user.username === args.username);
      if (result) {
        return result;
      }
    },

    incidents: (parent, args, context, info) => {
      if (!args.query) {
        return incidentData;
      }
      return incidentData.filter((incident) =>
        incident.comment
          .toLocaleLowerCase()
          .includes(args.query.toLocaleLowerCase()),
      );
    },
    incident: (parent, args, context, info) => {
      return incidentData.find((incident) => incident.id === args.id);
    },
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      const isEmailTaken = userData.some(
        (user) => user.email === args.data.email,
      );
      console.log(isEmailTaken);
      if (isEmailTaken) {
        throw new Error('Email already exists');
      }
      const user = {
        id: uuidv4(),
        isAdmin: false,
        ...args.data,
      };
      userData.push(user);
      return user;
    },

    deleteUser: (parent, args, ctx, info) => {
      const isUserExist = userData.find((user) => user.id === args.id);
      if (!isUserExist) {
        throw new Error('User not found');
      }
      const updateUserData = userData.filter((user) => user.id !== args.id);
      userData = updateUserData;
      return userData;
    },

    createIncident: (parent, args, ctx, info) => {
      const incident = {
        id: uuidv4(),
        ...args.data,
      };
      incidentData.push(incident);
      return incident;
    },

    deleteIncident: (parent, args, ctx, info) => {
      const isIncidentexist = incidentData.find(
        (incident) => incident.id === args.id,
      );
      if (!isIncidentexist) {
        throw new Error('This incident does not exist');
      }
      const updateIncidentData = incidentData.filter(
        (incident) => incident.id !== args.id,
      );
      incidentData = updateIncidentData;
      return incidentData;
    },
  },

  Incident: {
    createdBy: (parent, args, context, info) => {
      return userData.find((user) => user.id === parent.createdBy);
    },
  },

  User: {
    incidents: (parent, args, context, info) => {
      return incidentData.filter(
        (incident) => incident.createdBy === parent.id,
      );
    },
  },
};

export default resolvers;
