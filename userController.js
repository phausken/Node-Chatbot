const User = require('./sequelize');

const findUser = (name) => {
  return User.findOne({
    where: {name},
    attributes: ['id', 'name', 'goal']
  });
};

const createUser = (name, goal) => {
  return User.create({
    name,
    goal
  });
};

const updateUser = (name, goal) => {
  return User.update(
    {goal},
    { where: {name}}
  );
};

module.exports = {
  findUser,
  createUser,
  updateUser
};
