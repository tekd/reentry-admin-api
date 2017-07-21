const { merge } = require('lodash');

const resolverMap = {
  Query: {
    version(obj, args, context) {
      return '1.0';
    },
  },
};

module.exports = resolverMap;
module.exports = merge(
  resolverMap,
  require('./gql_types/configuration').resolvers,
//  require('./gql_types/description').resolvers,
//  require('./gql_types/resources').resolvers,
);
