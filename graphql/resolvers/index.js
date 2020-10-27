const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const fileResolvers = require('./file');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query,
        ...fileResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...fileResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}