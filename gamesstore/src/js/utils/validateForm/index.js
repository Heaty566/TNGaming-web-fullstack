const { validateGenre } = require("./genres");
const { validateGameNew, validateGameRestock, validateGameUpdate } = require("./games");
const { validateUser, validateLoginUser, validateUpdatePassword, validateUpdateProfile, validateAddBalance } = require("./users");

const users = {
    validateUser,
    validateLoginUser,
    validateUpdatePassword,
    validateUpdateProfile,
    validateAddBalance,
};

const games = {
    validateGameNew,
    validateGameRestock,
    validateGameUpdate,
};

const genres = {
    validateGenre,
};

export { users, games, genres };
