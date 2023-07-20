const { Users } = require('../models');

class SignupRepository {
  signup = async (id, password) => {
    await Users.create({ id, password });
  };
  findUser = async (id) => {
    const user = await Users.findOne({ where: { id } });
    return user;
  };
}

module.exports = SignupRepository;
