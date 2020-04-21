platformSchema = (tag) => {
    return {
        name: tag.name.toLowerCase(),
    };
};

module.exports = { platformSchema };
