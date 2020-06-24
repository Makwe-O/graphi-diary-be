import { subscribe } from 'graphql';

const Subscription = {
  newIncident: {
    subscribe: (parent, { userId }, { db, pubsub }, info) => {
      const userexist = db.userData.find((user) => user.id === userId);

      if (!userexist) {
        throw new Error('This user does not exist');
      }

      return pubsub.asyncIterator([`NEW_INCIDENT_${userId}`]);
    },
  },

  deletedIncident: {
    subscribe: (parent, { userId }, { db, pubsub }, info) => {
      const userexist = db.userData.find((user) => user.id === userId);

      if (!userexist) {
        throw new Error('This user does not exist');
      }
      return pubsub.asyncIterator([`DELETED_INCIDENT_${userId}`]);
    },
  },
};
export default Subscription;
