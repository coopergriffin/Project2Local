const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedMovies = require('./movieData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedMovies();
  console.log('\n----- MOVIES SEEDED -----\n');

  process.exit(0);
};

seedAll();