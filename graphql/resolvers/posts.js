const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');

module.exports = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            } catch(err){
                throw new Error(err);
            }
        },
        async getPost(_, {postId}){
            try {
                const post = await Post.findById(postId)
                if (post){
                    return post
                } else {
                    throw new Error("Post not found")
                }
            } catch(err){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context){
            const user = checkAuth(context);
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save();

            return post;
        },
        async deletePost(_, {postId}, context){
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postId);
                if (post){
                    if (user.username === post.username){
                        const deletePost = await Post.deleteOne(post);
                        return 'Post Deleted Successfully!';
                    } else {
                        throw new AuthenticationError('You cannot delete a post that does not belong to you. This post belongs to: ' + post.username);
                    }                    
                } else {
                    throw new Error('Post Id does not exist!');
                }
            } catch(err){
                throw new Error(err)
            }
        }
    }
}