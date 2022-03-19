const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    user: String,
    content: String
})

const Posts = mongoose.model('posts', PostSchema)

module.exports = Posts