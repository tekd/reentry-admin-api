const schema = `

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

  extend type Query {
    resources ( locale: String, topic: String, which: String ): Resources
  }

  extend type Mutation {
    updateResources ( locale: String, topic: String, which: String,
      content: ResourcesInput ): Resources
    }
`;

module.exports = schema;
