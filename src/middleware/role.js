const role = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            const error = new Error("Access denied: insufficient permissions");
            res.status(403);
            throw error;
        }
        next();
    };
};

export default role;