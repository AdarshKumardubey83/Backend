const jwt = require('jsonwebtoken')

async function identifyUser(req, res, next) {
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
    
    req.user = decoded;

    next(); //jab request ko middleware se controller pe forward karna padta hai, tab aapko next ko use karna padta hai
}

module.exports = identifyUser


