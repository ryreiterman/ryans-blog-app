const { Schema, model } = require('mongoose');

// create Schema, aka what should data look like/display

const commentSchema = new Schema({
    name: String,
    message: String
}, {
    timestamps: true
})

// model

const Comment = model('Comment', commentSchema)

module.exports = Comment;