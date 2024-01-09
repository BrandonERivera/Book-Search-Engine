const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        _id: ID
        bookId: String
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }


    type Query {
        me: User
    }

    input saveBook {
        authors: [String]
        description: String
        title: String!
        bookId: String!
        image: String
        link: String
    }

    type Mutations {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: saveBook!): User
        removeBook(bookId: ID!): User
    }
`

module.exports = typeDefs;