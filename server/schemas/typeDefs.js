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

    type Mutation {
        login(email: String!, password: String!)
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: saveBook!)
        removeBook(bookId: ID!)
    }
`

module.exports = typeDefs;