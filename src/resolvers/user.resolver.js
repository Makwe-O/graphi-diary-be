const User = {
  incidents: (parent, args, { db }, info) => {
    return db.incidentData.filter(
      (incident) => incident.createdBy === parent.id,
    );
  },
};
export default User;
