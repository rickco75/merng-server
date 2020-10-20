const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');


module.exports = (context) => {
    //console.log(context)
    const authHeader = context.req.headers.authorization;
    if (authHeader){
        // Bearer ...
        const token = authHeader.split('Bearer ')[1];
        if (token){
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user
            } catch(err){
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]')
    }
    console.log("no header provided")
    throw new Error('Authorization header must be provided')
}