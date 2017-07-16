const express = require('express');
const { apolloExpress, graphiqlExpress } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


console.log('Build the schema');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
console.log('Done');
// Import Firebase - for now (8/25/16), the use of require and import of individual
// submodules is needed to avoid problems with webpack (import seems to require
// beta version of webpack 2).
const firebase = require('firebase');
// firebase.initializeApp({
//   serviceAccount: './SimpliCityII-284f9d0ebb83.json',
//   databaseURL: 'https://simplicityii-878be.firebaseio.com',
// });

const GRAPHQL_PORT = process.env.PORT || 8080;
console.log(`The graphql port is ${GRAPHQL_PORT}`);
const graphQLServer = express().use('*', cors());

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress((req, res) => {
  if (!req.headers.authorization || req.headers.authorization === 'null') {
    console.log('NOT LOGGED IN');
    return {
      schema: executableSchema,
      context: {
        loggedin: false,
        token: null,
        uid: null,
        name: null,
        email: null,
        groups: [],
        subscriptions: null,
      },
    };
  }
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
