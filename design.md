# Design of the Administrative Application

In effect, the administrative interface to the reentry hub has a very simple purpose: to provide a user-friendly way for content editors to edit the underlying JSON files that are used to create the public site. The system must obviously also authenticate users and enforce permissions that prevent unauthorized users from modifying content.

To keep development of the administration client relatively simple, we will want to use a domain-specific API for communication with the server where the content files are stored. In other words, we want to allow a front-end developer of the reentry hub to issue, e.g., ```addResource``` or ```updateDescription``` commands with parameters specifying the county and topic. 

At the same time, an API for maintaining content stored in JSON files in a hierarchy of directories is actually of general utility and we want to solve the problem in a way that allows our solution here to be repurposed in other systems that need the same capability. Further, it would be ideal for the actual administrative interface for the content contained in a single file to be generated automatically based on the types of inputs required and any validations specified.

The approach I propose here uses GraphQL as the "glue" that marries the simplicity of an API tailored to the specific domain (here, information about reentry) to a general solution for easily creating web interfaces for editing JSON objects stored in files in a directory hierarchy on a server. Briefly, the domain-specific details are fully represented in a GraphQL  schema and both the client and server can use introspection to determine the structure of the domain representation and automatically build resolvers to update content (on the server) and display and editing interfaces (on the client).

## Design of the Server

Each file corresponds to a type in GraphQL.

Assuming we use Apollo, we can traverse the object returned by createExecutable Schema and figure out the types and what they correspond to, based in part on a convention about certain.

## Design of the Client

Wrap the overall interface in a query of the Schema and, once the data is received, build a map of all the types ()


## Tasks

### Move the content directories to their own repository.

We want to make it possible for the same code to be used for different instances of the content hierarchy.

### Create the front-end admin client repository

This project only implements the graphQL server portion. We originally planned to have the admin portion be a subdirectory on the reentry-resources-hub project, but I think it works better to keep it separate. Open to discussion of this.

### Decide GraphQL schema conventions
The schema will need to represent all structure and content in the system, i.e., both the hierarchy of directories and files that represent locales, topics and content types in the reentry system and the specific contents of individual files. My feeling is that files are represented in the schema via the top-level types (and endpoints in the top-level Query} and the directory hierarchy should be represented through a property (e.g., "path") shared by all top-level types. We will also need to establish conventions for indicating interface-related or validation-related metadata (e.g., a String property in the schema might be a simple text input, a text input that requires an email address, or a textarea that needs a rich text editor).

### Create the schema for the reentry site, including mutations
Next up is to actually create the schema for reentry and probably implement resolvers that just return some dummy data. This allows front- and back-end development to proceed independently.

### Implement the underlying FJOM

### Design the front end 

- auto editor
- overall layout and routes
- authentication
- authorization











