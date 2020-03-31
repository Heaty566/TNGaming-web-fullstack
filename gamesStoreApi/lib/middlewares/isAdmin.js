isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).json({ success: false, msg: "Forbidden" });

    next();
};

module.exports = { isAdmin };
