const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;


const authMiddleware = async (req, res, next) => {
    console.log("req.headers---", req.headers.authorization);
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const isCustomSignIn = token && token.length < 500;

        let decoded;

        if(token && isCustomSignIn) {
            decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
            req.userId = decoded.id;
            req.firstName = decoded.firstname;
            req.lastName = decoded.lastname;
            req.email = decoded.email
        }
        console.log('token middleware ---', token, req.userId, req.firstName, req.lastName, req.email);
        next();
    } catch (error) {
        console.log('error---midleware ---', error);
        res.status(401).json({error: error});
    }
}

module.exports = authMiddleware;