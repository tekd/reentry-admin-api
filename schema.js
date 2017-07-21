const baseSchema = `
  
  type Mutation {
    null: Boolean
  }

  type Query {
    version: String
  }
`;

module.exports = baseSchema.concat(
  require('./gql_types/configuration').schema,
//  require('./gql_types/description').schema,
//  require('./gql_types/resources').schema,
);

