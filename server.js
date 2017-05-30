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
for (const thing in executableSchema) {
  if (executableSchema.hasOwnProperty(thing)) {
    console.log('Name is ' + thing);
    if (thing === '_queryType') {
      for (const t2 in executableSchema[thing]) {
        if (executableSchema[thing].hasOwnProperty(t2)) {
          console.log(` .  Subname = ${t2}`);
          const t2Obj = executableSchema[thing][t2];
          if (t2 === 'name' || t2 === 'description') console.log(t2Obj);
          else if (t2 === '_fields') {
            for (const t3 in t2Obj) {
              if (t2Obj.hasOwnProperty(t3)) {
                console.log(` .  And the field is ${t3}`);
              }
            }
          }
        }
      }
    }
  }
}

/*
 * Import Firebase
 *    For now, the use of require and import of individual
 *    submodules is needed to avoid problems with webpack
 *    (import seems to require beta version of webpack 2).
 */
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
    return {
      schema: executableSchema,
      context: {
        loggedin: false,
        token: null,
        uid: null,
        name: null,
        email: null,
      },
    };
  }
  return firebase.auth().verifyIdToken(req.headers.authorization).then((decodedToken) => {
    console.log('auth-verify');
    return {
      schema: executableSchema,
      context: {
        loggedin: true,
        token: req.headers.authorization,
        uid: decodedToken.uid,
        name: decodedToken.name,
        email: decodedToken.email,
      },
    };
  }).catch((error) => {
    if (req.headers.authorization !== 'null') {
      console.log(`Error decoding firebase token: ${JSON.stringify(error)}`);
    }
    return {
      schema: executableSchema,
      context: {
        loggedin: false,
        token: null,
        uid: null,
        name: null,
        email: null,
      },
    };
  });
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));

