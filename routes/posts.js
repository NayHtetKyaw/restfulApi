const express = require('express');
const { update } = require('../models/Post');
const router = express.Router();
const Post = require('../models/Post');

 //routes  
    router.get('/', async(req, resp) => {
        try{
            const posts = await Post.find();
            resp.json(posts);
        }catch(err){
            resp.json({message: err})
        }
    });

    router.post('/', async(req,resp) => {
        const newpost = new Post({
            title: req.body.title,
            description: req.body.description
        });
        try{
            const savedPost = await newpost.save();
            resp.json(savedPost);
        }catch(err){
            resp.json({message: err});
        }
    }); 

//specific post 
router.get('/:postId', async(req, resp) => {
    try{
        const post = await Post.findById(req.params.postId);
        resp.json(post);
    }catch(err){
        resp.json({message: err});
    }
})

//delete a specific post 
router.delete('/:postId', async(req, resp) =>{
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        resp.json(removedPost);
    }catch(err){
        resp.json({message: err});
    }
})

//update a post
router.patch('/:postId', async(req, resp) =>{
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        );
        resp.json(updatedPost);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;  