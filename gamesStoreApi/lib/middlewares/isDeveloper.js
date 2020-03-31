isDeveloper = (req, res, next) => {
    if (!req.user.isDeveloper) return res.status(403).json({ success: false, msg: "Forbidden" });
    req.developer = {
        unique: Date.now()
    };
    next();
};

module.exports = { isDeveloper };
