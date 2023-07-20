const UsersService = require('../services/users.service.js');

class UsersController {
  usersService = new UsersService();
  signup = async (req, res, next) => {
    try {
      const { id, password, confirm } = req.body;

      //* 중복된 유저 찾기
      await this.usersService.findUser(id);

      //* 회원가입
      await this.usersService.signup(id, password, confirm);
      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { id, password } = req.body;
      const token = await this.usersService.login(id, password);
      if (token) {
        res.cookie('Authorization', `Bearer ${token}`, {
          httpOnly: true, // 브라우저만 쿠키를 읽을 수 있게 설정.
          sameSite: 'none', // 도메인이 다른경우에도 브라우저가 쿠키를 포함해서 요청을 보낼 수 있음.
          secure: true, // sameSite: 'none' 일 경우 이값은 반드시 true여야 한다. https를 사용할 때만 쿠키를 request header에 담겨서 서버에 보내지고 http는 쿠키 안담긴다.
          path: '/',
        });
        return res.status(200).json({ message: token });
      }
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      res.clearCookie('Authorization');
      return res.status(200).json({ message: '로그아웃 되었습니다.' });
    } catch (error) {
      next(error);
    }
  };
  userInfo = async (req, res, next) => {
    try {
      const user = res.locals.user;
      return res.status(200).json({ data: { id: user.id } }); // 원래 여기가 user.id였음 근데 위의 값엔 user = 12345 임. 즉,12345.id 를 하니까 안된거임.
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
