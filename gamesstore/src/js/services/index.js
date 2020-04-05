//combine user service
import { loginUser, addBalance, changeUserPassword, logoutUser, getUser, registerUser, updateProfile, uploadAvatar } from "./users/users";
import { addGameToWishList, removeGameFromWishList, addGameToCart, removeGameFromCart, purchaseGames } from "./users/games";

//combine admin service
import { allUsers, cleanToken, toggleUserAdmin, toggleUserDeveloper } from "./admin/users";
import { addNewGenre, updateGenre } from "./admin/genres";

//combine game service
import { getGame, getGameByGenre, getGameBySearchKey, getGames } from "./games/games";

const adminService = {
    users: { allUsers, cleanToken, toggleUserDeveloper, toggleUserAdmin },
    genres: { addNewGenre, updateGenre },
};

const usersService = {
    users: { logoutUser, loginUser, addBalance, changeUserPassword, getUser, registerUser, updateProfile, uploadAvatar },
    games: { addGameToWishList, removeGameFromWishList, addGameToCart, removeGameFromCart, purchaseGames },
};

const gamesService = {
    games: { getGame, getGames, getGameByGenre, getGameBySearchKey },
};

export { adminService, usersService, gamesService };
