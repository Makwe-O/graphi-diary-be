const Query = {
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
    const result = db.userData.find((user) => user.username === args.username);
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
};

export default Query;
