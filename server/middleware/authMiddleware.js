const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.admintoken;
    if(token) {
        jwt.verify(token, 'admintokensecret',(error, decoded)=>{
            if(error){
                res.json({ status:"error", message:"Protected route, Token doesn't exist" });
            } else {
                next();
            }
        })
    } else {
        res.json({ status:"error", message:"Protected route, Token doesn't exist" });
    }
}


module.exports = { 
    requireAuth,
}