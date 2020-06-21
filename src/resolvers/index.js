import Query from './query.resolver';
import Mutation from './mutation.resolver';
import Incident from './incident.resolver';
import User from './user.resolver';
import Subscription from './subscription.resolver';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Incident,
  User,
};

export default resolvers;
