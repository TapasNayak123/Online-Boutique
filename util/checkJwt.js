const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    var token = req.headers['token'];
    if (token) {
        const decode = jwt.verify(token, "tapas");
        req.decode = decode;
        next();
    } else {
        res.json({
            success: false,
            message: "Token not present !!!!!!!!!"
        })
    }
}