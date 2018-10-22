module.exports = `
  type Student {
    id: ID!
    name: String!
  }
  type Teacher {
    id: ID!
    name: String!
  }
  type Subject {
    id: ID!
    name: String!
  }
  type Query {
    students: [Student]
  }
  `