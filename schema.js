// This contains the schema for description and resources. Move
// the appropriate types and endpoints when implementing.
const schemaAdditions = `

  input DescriptionInput {
    description: [String]
  }

  type Description {
    description: [String]
  }

  type Resource {
    name: String!
    description: String!
    url: String
    category: String
  }

  input ResourceInput {
    name: String!
    description: String!
    url: String
    category: String
  }

  input ResourcesInput {
    resources: [ResourceInput]
  }

  type Resources {
    resources: [Resource]
  }

  type Query {
    description ( locale: String, topic: String ): Description
    resources ( locale: String, topic: String, which: String ): Resources
  }

  type Mutation {
    updateDescription ( locale: String, topic: String,
      content: DescriptionInput ): Description
    updateResources ( locale: String, topic: String, which: String,
      content: ResourcesInput ): Resources
  }
`;

const baseSchema = `
  
  type Mutation {
    null: Boolean
  }

  type Query {
    version: String
  }
`;

module.exports = baseSchema.concat(
  require('./gql_types/configuration/configuration_schema'),
);

