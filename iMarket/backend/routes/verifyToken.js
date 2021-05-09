const {verifyToken} = require('../utils/token')
module.exports = function auth (req, res, next){
    if (!req.session.user){
        res.status(401).send({
            status: "BAD",
            message: 'You are not logged in'
        });
        return;
    }
    const verified = verifyToken(req.session.user);
    req.user = verified;
    next();
}