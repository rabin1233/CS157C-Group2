const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Post = require('../models/Product')

router.get('/', async (req, res)=>{

    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        res.json({message: err})
    }
});

router.post('/', verify, async (req, res)=> { 
    const newData = {
        ...req.body,
        createdAt : new Date().toISOString(),
        uid: req.user.id,
        name: req.user.name,
        email: req.user.email,
    }
    //
    const item = new Post(newData)

    try{
        const newItem = await item.save();

        res.status(200).json({
            data: newItem,
            message: "New Item is uploaded",
            status: "OK"
        })
    }
    catch(e){
        res.status(400).json({
            status: 'BAD',
            message: 'Something went wrong'
        })
    }


   

});

router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    try{
        const post = await Post.find({uid: uid})
        res.status(200).json({
            status: "OK",
            data: post,
        });
    }
    catch(err){
        res.status(400).json({message: err});
    }
});

//get request for deleting 
router.delete('/:postId', verify, async (req, res) => {
    const itemId = req.params.postId;
    console.log(itemId);
    try{
        const removedPost = await Post.remove({_id: itemId});
        res.status(200).json({
            status: "OK",
            id: itemId,
            message: 'Your item has been deleted'
        });
    }catch(err){
        res.status(400).json({message: err});
    }
});


router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}});
        res.json(updatedPost);
    } catch(err){
        res.json({message: err});
    }
});


module.exports = router;