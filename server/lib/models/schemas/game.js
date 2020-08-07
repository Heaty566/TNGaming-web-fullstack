gameSchema = (game) => {
    return {
        name: game.name.trim(),
        price: Number(game.price),
        tagId: game.tagId,
        platformId: game.platformId,
        description: game.description.trim(),
        available: game.available ? game.available : false,
        stock: game.stock ? game.stock : 0,
        images: [],
        date: game.date,
        publisher: game.publisher,
    };
};

module.exports = { gameSchema };
