userSchema = user => {
    return {
        name: user.name.trim(),
        username: user.username.toLowerCase().trim(),
        email: user.email.toLowerCase().trim(),
        password: user.password.trim(),
        phone: user.phone,
        address: user.address,
        isDeveloper: user.isDeveloper ? user.isDeveloper : false,
        isAdmin: user.isAdmin ? user.isAdmin : false,

        avatar: "",
        balance: 0,
        gamesDev: [],
        wishlist: [],
        library: [],
        cart: [],
        history: []
    };
};

module.exports = { userSchema };
