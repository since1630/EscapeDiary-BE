const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/auth_middleware');
const { signupSchema, loginSchema } = require('../schemas/users')

// 회원가입
router.post('/signup', async (req, res) => {
  const { id, password, confirm } = req.body;
  try {    
    const signupData = {id,password,confirm}
    const {error} = signupSchema.validate(signupData)
    if (error){
      return res.status(412).json({message : error.details[0].message})
    }

    // id 유니크
    const existUser = await Users.findOne({ where: { id } });
    console.log(existUser);
    if (existUser) {
      return res.status(412).json({ message: '중복된 id 입니다.' });
    }

    // 회원 가입
    await Users.create({ id, password });
    return res.status(201).json({ message: '회원가입에 성공하였습니다.' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: '요청한 데이터 형식이 올바르지 않습니다.' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    console.log('login_id:', id);

    const loginData = {id,password}
    const {error} = loginSchema.validate(loginData)
    if(error){
      return res.status(412).json({message:error.details[0].message})
    }

    const existUser = await Users.findOne({ where: { id } });
    console.log('login_existUser:', existUser);
    // id 비밀번호 확인
    if (!existUser || password !== existUser.password) {
      return res
        .status(400)
        .json({ message: ' id와 비밀번호를 확인해주세요.' });
    }

    // 토큰 발급
    const token = jwt.sign({ id: existUser.id }, 'escape');

    res.cookie('Authorization', `Bearer ${token}`, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    });
    return res.status(200).json({ message: token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '로그인에 실패하였습니다.' });
  }
});

// 로그아웃 하나 구현
router.post('/logout', async (req, res) => {
  try {
    res.clearCookie('Authorization');
    return res.status(200).json({ message: '로그아웃 되었습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '로그아웃에 실패하였습니다.' });
  }
});

// user 정보 받는 라우터 하나(verify 쓰고)
router.get('/user', verifyToken, (req, res) => {
  try {
    console.log('집에가자');
    // const userId = req.locals.user;
    const user = res.locals.user;
    console.log('user_res.locals.user', user);
    return res.status(200).json({ data: { id: user.id } }); // 원래 여기가 user.id였음 근데 위의 값엔 user = 12345 임. 즉,12345.id 를 하니까 안된거임.
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: '유저 정보를 불러오지 못했습니다.' });
  }
});

module.exports = router;
