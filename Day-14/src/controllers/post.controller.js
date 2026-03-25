const postmodel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken');

const imageKit = new ImageKit({
    privateKey: process.env.ImageKit_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body, req.file);

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Token not provided, Unathorized access"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET); //is line pe hum token ke andar jo data hai usko padh hi rahe hote hai aur saath saath verify kar rahe hote hai ki token sahi hai ya nhi(Humare hi server ne kiya hai ya nhi) with the help of jwt_secret
    } catch (err) {
        return res.status(401).json({
            message: "user not authroized"   //token fake bhi ban sakta hai na isliye
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
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })
    
}

async function getPostController(req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unathorized Access"
        })
    }
    
    let decoded;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
        return res.status(401).json({
            message: "Token invalid"
        })
    }

    const userId = decoded.id;

    const posts = await postmodel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully.",
        posts
    })

}
    
async function getPostDetailsController(req, res){
    
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Unathorized Access"
        })
    }

    let decoded;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    const userId = decoded.id;
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


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}



