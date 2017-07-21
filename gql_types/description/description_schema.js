const schema = `

  input DescriptionInput {
    description: [String]
  }

  type Description {
    description: [String]
  }

  extend type Query {
    description ( locale: String, topic: String ): Description
  }

  extend type Mutation {
    updateDescription ( locale: String, topic: String,
      content: DescriptionInput ): Description
  }
`;

module.exports = schema;
