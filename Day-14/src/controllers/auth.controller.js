const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function loginController(req,res){
    const{ username, email , password } = req.body;

    /**
     *username
     *password
     *
     *email
     *password 
     */

     const user = await userModel.findOne({
        $or:[
            {
                /**
                 * condition
                 */
                username:  username
            },
            {
                email: email
            }
        ]
     })

     if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    /*const hash = crypto.createHash('sha256').update(password).digest('hex');

    const isPasswordValid = hash == user.password */ /*This two line can be converted into one line */

    const isPasswordValid = await bcrypt.compare(password, user.password); /*ye line dono kaam karti hai, pehla jo login ke time password aaya hai usse convert karo hash mein aur then usse comapre karo apne current wale password se */

    if(!isPasswordValid){
        return res.status(404).json({
            message: "password invalid"
        })
    }

    const token = jwt.sign(
        { id:user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token",token);

    res.status(200)
    .json({
        message: "User loggedIn successfully.",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })


}

async function registerController (req,res){
    const{ username,email,password,bio,profileImage} = req.body;

    // const isUserExistsByEmail = await userModel.findOne({ email });

    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message: "User already exists with same email"
    //     })
    // }

    // const isUserExistsByUsername = await userModel.findOne({ username });

    // if(isUserExistsByUsername){
    //     return res.status(409).json({
    //         message: "User already exists with same username"
    //     })
    // }

    /*Ek hi baar mein karenge ye dono kaam */

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409)
        .json({
            message: "User already exists " + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
        })
    }

    const hash = await bcrypt.hash(password, 10); /*ye jo 10 number hai ye batata hai kitni baar hashing karni hai */

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign(
        {
        id: user._id
        },
        process.env.JWT_SECRET, 
        { expiresIn: "1d" }
    )

    res.cookie("token", token);

    res.status(201).json({
        message: 'User registerd successfully',
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}




