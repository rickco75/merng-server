const { ApolloServer, PubSub } = require('apollo-server-express');
const express = require('express')

const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const pubSub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ( { req } ) => ( { req, pubSub }) 
});

const app = express()
server.applyMiddleware({ app})

app.use(express.static('public'))

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected')
        app.listen( { port: PORT }, () => {
          console.log(`Server running at port: ${PORT}`)
        })
        // return server.listen({ port: PORT })
        // .then(res => {
        //     console.log(`Server running at ${res.url}`)
        // })
    })
    .catch(err => {
      console.error(err)
    })


