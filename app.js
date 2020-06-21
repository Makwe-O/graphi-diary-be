// import express from 'express';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import connectDb from './src/models';

// dotenv.config();
// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ type: 'application/json' }));

// app.get('/', (request, response) => {
//   response.status(200).json({
//     status: 'success',
//     message: 'Welcome to dairy app'
//   });
// });

// app.all('*', (request, response) => {
//   response.status(404).json({
//     status: 'error',
//     message: 'This route does not exist.'
//   });
// });

// connectDb()
//   .then(async () => {
//     if (!module.parent) {
//       app.listen(4000, () => {
//         // eslint-disable-next-line
//         console.log('app is listening to port 4000');
//       });
//     }
//   })
//   .catch(err => console.log('Something bad happened', err));

// export default app;

import { ApolloServer, PubSub } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import db from './src/models/data';
import typeDefs from './src/typedefs';
import resolvers from './src/resolvers';

const pubsub = new PubSub();
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: {
    db,
    pubsub,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`);
});
