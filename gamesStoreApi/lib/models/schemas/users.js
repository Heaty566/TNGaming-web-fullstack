userSchmea = user => {
    return {
        name: user.name,
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin ? user.isAdmin : false
    };
};
