const { Schema, model } = require('mongoose');
const blogSchema = new Schema(
	{
		title: String,
		body: String,
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
	},
	{
		timestamps: true
	}
);
const Blog = model('Blog', blogSchema);
module.exports = Blog;
