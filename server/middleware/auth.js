const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).send("Not Authorized.");
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send("Invalid token");
    }
}