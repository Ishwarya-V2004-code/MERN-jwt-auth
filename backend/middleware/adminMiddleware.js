const { model } = require("mongoose");

const adminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.send("Access Denied")

    } next();

}
module.exports = adminMiddleware;