const jwt = require("jsonwebtoken");


const token_auth = (req, res, next) => {
    //Get the user from thejwt token and add id to req object
    const token = req.header('auth-token');
    
    if(!token){
        res.status(401).send({error: "Please Give valid token"})
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    if(data) {
        req.admin = data.admin;
        return next();
        
        
    } else {
        res.status(401).send({error: "Please Authentication using a valid token"})
    }
}
module.exports = token_auth;