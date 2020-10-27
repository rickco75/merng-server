const checkAuth = require('../../util/checkAuth');
const path = require('path')
const fs = require('fs')
//const { createWriteStream, unlink } = require('fs');
const shortid = require('shortid');
// const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  Query: {
    hello: () => 'Hello World'
  },
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file
      const stream = createReadStream()
      //const pathname = path.join(__dirname, `/public/images/${filename}`)
      const pathname = `./public/images/${filename}`
      await stream.pipe(fs.createWriteStream(pathname))

      return {
        url: `http://localhost:5000/images/${filename}`
      }
    },
  }
};