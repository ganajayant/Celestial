import jwt from "jsonwebtoken";

const JWTVERIFY = (req, res, next) => {
    // next()
    const token = req.header("auth-token");
    if (!token) {
        console.log('No Token');
        return res.status(401).send("Access Denied");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log('Verfied Token');
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

export default JWTVERIFY;