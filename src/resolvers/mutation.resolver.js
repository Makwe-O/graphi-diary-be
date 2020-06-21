import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  createUser: (parent, args, { db }, info) => {
    const isEmailTaken = db.userData.some(
      (user) => user.email === args.data.email,
    );

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
    // eslint-disable-next-line no-param-reassign
    db.incidentData = updateIncidentData;
    return db.incidentData;
  },

  updateIncident: (parent, args, { db }, info) => {
    const getIncident = db.incidentData.find(
      (incident) => incident.id === args.id,
    );

    if (!getIncident) {
      throw new Error('This incident does not exist');
    }

    getIncident.location = args.data.location || getIncident.location;
    getIncident.comment = args.data.comment || getIncident.comment;
    getIncident.createdAt = args.data.createdAt || getIncident.createdAt;
    return getIncident;
  },
};
export default Mutation;
