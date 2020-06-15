import { v4 as uuidv4 } from 'uuid';

const resolvers = {
  Query: {
    users: (parent, args, { db }, info) => {
      if (!args.query) {
        return db.userData;
      }
      return db.userData.filter((user) =>
        user.username
          .toLocaleLowerCase()
          .includes(args.query.toLocaleLowerCase()),
      );
    },
    user(parent, args, { db }, info) {
      const result = db.userData.find(
        (user) => user.username === args.username,
      );
      if (result) {
        return result;
      }
    },

    incidents: (parent, args, { db }, info) => {
      if (!args.query) {
        return db.incidentData;
      }
      return db.incidentData.filter((incident) =>
        incident.comment
          .toLocaleLowerCase()
          .includes(args.query.toLocaleLowerCase()),
      );
    },
    incident: (parent, args, { db }, info) => {
      return db.incidentData.find((incident) => incident.id === args.id);
    },
  },
  Mutation: {
    createUser: (parent, args, { db }, info) => {
      const isEmailTaken = db.userData.some(
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
      db.userData.push(user);
      return user;
    },

    deleteUser: (parent, args, { db }, info) => {
      const isUserExist = db.userData.find((user) => user.id === args.id);
      if (!isUserExist) {
        throw new Error('User not found');
      }
      const updateUserData = db.userData.filter((user) => user.id !== args.id);
      db.userData = updateUserData;
      return db.userData;
    },

    createIncident: (parent, args, { db }, info) => {
      const incident = {
        id: uuidv4(),
        ...args.data,
      };
      db.incidentData.push(incident);
      return incident;
    },

    deleteIncident: (parent, args, { db }, info) => {
      const isIncidentexist = db.incidentData.find(
        (incident) => incident.id === args.id,
      );
      if (!isIncidentexist) {
        throw new Error('This incident does not exist');
      }
      const updateIncidentData = db.incidentData.filter(
        (incident) => incident.id !== args.id,
      );
      db.incidentData = updateIncidentData;
      return db.incidentData;
    },
  },

  Incident: {
    createdBy: (parent, args, { db }, info) => {
      return db.userData.find((user) => user.id === parent.createdBy);
    },
  },

  User: {
    incidents: (parent, args, { db }, info) => {
      return db.incidentData.filter(
        (incident) => incident.createdBy === parent.id,
      );
    },
  },
};

export default resolvers;
