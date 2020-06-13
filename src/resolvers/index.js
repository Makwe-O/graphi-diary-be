const userData = [
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

const incidentData = [
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
      return 'No';
    },

    incidents: () => incidentData,
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
