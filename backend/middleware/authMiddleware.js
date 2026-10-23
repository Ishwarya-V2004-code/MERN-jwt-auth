// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {

//     const authHeader = req.headers.authorization;
//     console.log(authHeader)
//     const token = authHeader.split(" ")[1];
//     console.log(token)

//     if (!token) {
//         return res.send("un-authorized request");
//     }
//     try {
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         )
//         //console.log(decoded);
//         req.user = decoded
//     } catch (err) {
//         return res.send('Un-authorized user')
//     }

//     next();

// }

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("AuthHeader from frontend:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "un-authorized request - no header" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    if (!token || token === "null" || token === "undefined") {
        return res.status(401).json({ message: "un-authorized request - token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);
        req.user = decoded;
        next(); // <-- MUST be inside try
    } catch (err) {
        console.log("JWT Error:", err.message);
        return res.status(401).json({ message: "Un-authorized user - " + err.message });
    }
}

module.exports = authMiddleware;