const { Movie, User, sequelize } = require('./database');

(async () => {
  await sequelize.sync({ force: true, logging() { } });

  try {
    await sequelize.transaction(async () => {
      // const yh = await User.create({
      //   name: '용현',
      //   Movies: [
      //     { name: '영화1' },
      //     { name: '영화2' },
      //     { name: '영화3' }
      //   ]
      // }, {
      //   include: [Movie]
      // });
      const yh = await User.create({ name: '용현' });
      const kh = await User.create({ name: '기현' });
      const movie1 = await Movie.create({ name: '영화1' });
      const movie2 = await Movie.create({ name: '영화2' });
      const movie3 = await Movie.create({ name: '영화3' });

      // await yh.addMovies([movie1, movie2, movie3]);
      // await movie1.addUsers([yh, kh]);
      // await movie2.addUser(yh);

      // const findYh = await User.findOne({
      //   attributes: ['id'],
      //   where: { id: yh.id },
      // });
      const findYh = await User.findByPk(yh.id, { attributes: ['id'] });
      await findYh.addMovies([movie1, movie2, movie3]);
      await findYh.reload({
        attributes: ['id', 'name'],
        include: [{
          model: Movie,
          attributes: ['id', 'name'],
          through: { attributes: [], }
        }]
      });

      console.log(JSON.stringify(findYh, null, 2));

      // await findYh.destroy();

      // await yh.save();
    });
  } catch (error) {
    console.error(error);
  }
})();