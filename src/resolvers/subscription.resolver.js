import { subscribe } from 'graphql';

const Subscription = {
  count: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator(['COUNT_CHANGE']);
    },
  },

  newIncident: {
    subscribe: (parent, { userId }, { db, pubsub }, info) => {
      const userexist = db.userData.find((user) => user.id === userId);
      if (!userexist) {
        throw new Error('This user does not exist');
      }

      return pubsub.asyncIterator([`NEW_INCIDENT_${userId}`]);
    },
  },
};
export default Subscription;
