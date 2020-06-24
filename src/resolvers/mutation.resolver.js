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

  updateUser: (parent, args, { db }, info) => {
    const { id, data } = args;
    const userExist = db.userData.find((user) => user.id === id);
    if (!userExist) {
      throw new Error('User not found');
    }
    userExist.firstname = data.firstname || userExist.firstname;
    userExist.lastname = args.data.lastname || userExist.lastname;
    userExist.phonenumber = args.data.phonenumber || userExist.phonenumber;
    return userExist;
  },

  createIncident: (parent, args, { db, pubsub }, info) => {
    const incident = {
      id: uuidv4(),
      ...args.data,
    };
    db.incidentData.push(incident);
    pubsub.publish(`NEW_INCIDENT_${args.data.createdBy}`, {
      newIncident: {
        message: 'CREATED',
        data: incident,
      },
    });
    return incident;
  },

  deleteIncident: (parent, args, { db, pubsub }, info) => {
    const isIncidentexist = db.incidentData.find(
      (incident) => incident.id === args.id,
    );
    if (!isIncidentexist) {
      throw new Error('This incident does not exist');
    }
    const updateIncidentData = db.incidentData.filter(
      (incident) => incident.id !== args.id,
    );
    pubsub.publish(`DELETED_INCIDENT_${isIncidentexist.createdBy}`, {
      deletedIncident: {
        message: 'DELETED',
        data: isIncidentexist,
      },
    });
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
