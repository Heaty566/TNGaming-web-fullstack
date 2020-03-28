genresSchema = genre => {
  return {
    name: genre.name.toLowerCase()
  };
};

module.exports = { genresSchema };
