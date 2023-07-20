const UsersRepository = require('../repositories/users.repository.js');
const { signupSchema, loginSchema } = require('../schemas/users.schema.js');
const CustomError = require('../middlewares/error_middleware.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UsersService {
  usersRepository = new UsersRepository();

  signup = async (id, password, confirm) => {
    const { error } = signupSchema.validate({
      id,
      password,
      confirm,
    });
    if (error) {
      throw new CustomError(error.details[0].message, 412);
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    await this.usersRepository.signup(id, hashedPassword);
  };
  findUser = async (id) => {
    const user = await this.usersRepository.findUser(id);
    if (user) {
      throw new CustomError('중복된 닉네임입니다.', 412);
    }
  };

  login = async (id, password) => {
    const { error } = loginSchema.validate({
      id,
      password,
    });
    if (error) {
      throw new CustomError(error.details[0].message, 412);
    }

    const existUser = await this.usersRepository.findUser(id);
    // DB에 있는 유저의 패스워드와 현재 입력된 패스워드가 다르면 곧바로 login 함수 종료
    if (!existUser || !bcrypt.compareSync(password, existUser.password)) {
      throw new CustomError('닉네임 또는 패스워드를 확인해주세요.', 412);
    }

    // 토큰 발급
    const token = jwt.sign({ id: existUser.id }, process.env.JWT_SECRET_KEY);

    return token;
  };
}

module.exports = UsersService;
