tagsSchema = (tag) => {
    return {
        name: tag.name.toLowerCase(),
    };
};

module.exports = { tagsSchema };
