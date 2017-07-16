# Sample Queries & Mutations

## Queries

````
query {
  config (locale: "buncombe") {
    pairs {
      name
      value
    }
  }
}
````

## Mutations

````
mutation {
  updateConfig(content: {
    pairs: [
      {
        name: "common_jurisdiction_name"
        value: "The Old North State"
      },
      {
        name: "common_jurisdiction"
        value: "nc"
      }
    ]
  }) {
    pairs {
      name
      value
    }
  }
}

````



