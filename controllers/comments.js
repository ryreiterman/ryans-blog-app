const Comment = require('../models/comment');
const Blog = require('../models/blog')
const express = require('express');
const commentRouter = express.Router();

// create routes

// INDUCES

// Don't need NEW or EDIT

// CREATE, READ, UPDATE, DESTROY

// Create

commentRouter.post('/', async (req, res) => {
	try {
        const { name, message, blogID } = req.body
		const newComment = await Comment.create({
            name,
            message
        });

        // Find the blog to add comments to, store comments in blog into blogComments, don't want to lose comments already in there, 
        const blog = await Blog.findById(blogID)
        const blogComments = blog.comments
        const updatedBlog = await Blog.findByIdAndUpdate(blogID, {comments: [...blogComments, newComment._id]})



		res.status(200).json(newComment);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Read has 2 sub-routes: Index, Show

// Index (All comments)

commentRouter.get('/', async (req, res) => {
	try {
		const foundComments = await Comment.find({});

		res.status(200).json(foundComments);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Show (Individual comment)

commentRouter.get('/:id', async (req, res) => {
	try {
		const foundComment = await Comment.findById(req.params.id);

		res.status(200).json(foundComment);
	} catch (error) {
		res.status(400).json(error);
	}
});

//Destroy

commentRouter.delete('/:id', async (req, res) => {
	try {
		const foundComment = await Comment.findByIdAndDelete(req.params.id);

		res.status(200).json(foundComment);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Update

commentRouter.put('/:id', async (req, res) => {
	try {
		const foundComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		});

		res.status(200).json(foundComment);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = commentRouter;
