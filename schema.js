const baseSchema = `
  type NameValuePair {
    name: String!
    value: String!
  }

  input NameValuePairInput {
    name: String!
    value: String!
  }

  type Configuration {
    pairs: [NameValuePair]
  }

  input ConfigurationInput {
    pairs: [NameValuePairInput]
  }

  type Query {
    config ( locale: String, topic: String ): Configuration
  }

  type Mutation {
    updateConfig ( locale: String, topic: String, content: ConfigurationInput! ): Configuration
  }
`;

const addSchema = `


  type DescriptionInput {
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

  input ResourcesInput {
    resources: [Resource]
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

module.exports = baseSchema;
