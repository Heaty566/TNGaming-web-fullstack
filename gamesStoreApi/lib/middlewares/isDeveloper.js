isDeveloper = (req, res, next) => {
    if (!req.user.isDeveloper) return res.status(403).json({ success: false, msg: "Forbidden" });

    next();
};

module.exports = { isDeveloper };
