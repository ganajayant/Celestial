import jwt from "jsonwebtoken";

const JWTVERIFY = (req, res, next) => {
    // next()
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send("Access Denied");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

export default JWTVERIFY;