const schema = `
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

  extend type Query {
    config ( locale: String, topic: String ): Configuration
  }

  extend type Mutation {
    updateConfig ( locale: String, topic: String, content: ConfigurationInput! ): Configuration
  }
`;


module.exports = schema;
