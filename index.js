const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const { MONGODB } = require('./config.js')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database connected");
    return server.listen({ port: PORT });
})
.then(res => {
        console.log(`server running at ${res.url}`);
})
    .catch(err => {
    console.error(err);
})

