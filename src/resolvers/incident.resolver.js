const Incident = {
  createdBy: (parent, args, { db }, info) => {
    return db.userData.find((user) => user.id === parent.createdBy);
  },
};
export default Incident;
