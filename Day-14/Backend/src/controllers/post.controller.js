const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken');
const likeModel = require('../models/like.model');

const imageKit = new ImageKit({
    privateKey: process.env.ImageKit_PRIVATE_KEY
})

async function createPostController(req,res){
    

    const token = req.cookies("token");

    if(!token){
        return res.status(401).json({
            message: "Token not provided, Unathorized access"
        })
    }

    let decoded = null

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (err){
        return res.status(401).json({
            message: "User not authorized"
        })
    }

    console.log(decoded);

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    const post = await postmodel.create({
        caption: req.body.caption,
        imgUrl:  file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })
    
}

async function getPostController(req,res){
    

    const userId = req.user.id;

    const posts = await postmodel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully.",
        posts
    })

}
    
async function getPostDetailsController(req, res){
    
    

    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postmodel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user === userId

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully.",
        post
    })
}

async function likePostController(req, res){

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    
}



