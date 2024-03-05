const { User } = require('../models');

const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password123',
    highScore: 5,
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password123',
    highScore: 3,
  },
  // Add more users as needed
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;