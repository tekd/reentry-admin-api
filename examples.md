# Sample Queries & Mutations

## Queries

### Site configuration
query {
  config {
    pairs {
      name
      value
    }
  }
}

### Locale configuration
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

### Topic and locale configuration
````
query {
  config (locale: "buncombe", topic: "jobs") {
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



