gameSchema = game => {
    return {
        name: game.name.trim(),
        price: game.price,
        genreId: [game.genreId],
        description: game.description.trim(),
        available: game.available ? game.available : false,
        stock: game.stock ? game.stock : 0
    };
};

module.exports = { gameSchema };
