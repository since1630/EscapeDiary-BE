const { Users } = require('../models');

class SignupRepository {
  signup = async (id, hashedPassword) => {
    await Users.create({ id, password: hashedPassword });
  };
  findUser = async (id) => {
    const user = await Users.findOne({ where: { id } });
    return user;
  };
  //   login = async (id, password) => {
  //     const user = await Users.findOne({ where: { id } });
  //     return user;
  //   };
}

module.exports = SignupRepository;
