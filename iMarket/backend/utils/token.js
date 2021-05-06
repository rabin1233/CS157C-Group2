const jwt = require('jsonwebtoken');

exports.signedToken = (userObj) => {
    const signedValue = jwt.sign(userObj, process.env.TOKEN_SECRET);
    return signedValue;
}

exports.verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
}