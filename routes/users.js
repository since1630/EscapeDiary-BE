const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth_middleware');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

// 회원가입
router.post('/signup', usersController.signup);

// 로그인
router.post('/login', usersController.login);

// 로그아웃
router.post('/logout', usersController.logout);

// 유저 정보 조회
router.post('/user', verifyToken, usersController.userInfo);

// // 회원가입 //password를 받을때 암호화 해서 저장
// router.post('/signup', async (req, res) => {
//   const { id, password, confirm } = req.body;
//   try {
//     const signupData = { id, password, confirm };
//     const { error } = signupSchema.validate(signupData);
//     if (error) {
//       return res.status(412).json({ message: error.details[0].message });
//     }

//     // id 유니크
//     const existUser = await Users.findOne({ where: { id } });
//     if (existUser) {
//       return res.status(412).json({ message: '중복된 id 입니다.' });
//     }

//     // 회원 가입
//     const hashedPassword = bcrypt.hashSync(password, 10);
//     await Users.create({ id, password: hashedPassword });
//     return res.status(201).json({ message: '회원가입에 성공하였습니다.' });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(400)
//       .json({ message: '요청한 데이터 형식이 올바르지 않습니다.' });
//   }
// });

// // 로그인 // password를 받을때 암호화 해서 데이터베이스랑 비교
// router.post('/login', async (req, res) => {
//   try {
//     const { id, password } = req.body;

//     const loginData = { id, password };
//     const { error } = loginSchema.validate(loginData);
//     if (error) {
//       return res.status(412).json({ message: error.details[0].message });
//     }

//     const existUser = await Users.findOne({ where: { id } });
//     // id 비밀번호 확인
//     if (!existUser || !bcrypt.compareSync(password, existUser.password)) {
//       return res
//         .status(400)
//         .json({ message: ' id와 비밀번호를 확인해주세요.' });
//     }

//     // 토큰 발급
//     const token = jwt.sign({ id: existUser.id }, process.env.JWT_SECRET);

//     res.cookie('Authorization', `Bearer ${token}`, {
//       httpOnly: true,
//       sameSite: 'none',
//       secure: true,
//       path: '/',
//     });
//     return res.status(200).json({ message: token });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: '로그인에 실패하였습니다.' });
//   }
// });

// // 로그아웃 구현
// router.post('/logout', async (req, res) => {
//   try {
//     res.clearCookie('Authorization');
//     return res.status(200).json({ message: '로그아웃 되었습니다.' });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: '로그아웃에 실패하였습니다.' });
//   }
// });

// // user 정보 받는 라우터 하나(verify 쓰고)
// router.get('/user', verifyToken, (req, res) => {
//   try {
//     const user = res.locals.user;
//     return res.status(200).json({ data: { id: user.id } }); // 원래 여기가 user.id였음 근데 위의 값엔 user = 12345 임. 즉,12345.id 를 하니까 안된거임.
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(400)
//       .json({ message: '유저 정보를 불러오지 못했습니다.' });
//   }
// });

module.exports = router;
