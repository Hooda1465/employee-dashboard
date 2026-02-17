const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next)=>{

    const token = req.header("Authorization").split(" ")[1];
 
    if(!token){
        return res.status(400).json({message:"No token, authorization denied"});

    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch(error){
        res.status(500).json({message: "Token is not valid"});

    }

}

module.exports = authMiddleware ;