import jwt from 'jsonwebtoken';


const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const error = new Error("No token, authorization denied");
        res.status(401);
        throw error;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        const error = new Error("Token is not valid");
        res.status(401);
        throw error;
    }
};

export default auth;