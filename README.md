# EscapeDiary

# 📌 Table Of Contents

- [📖 Introduction](#-introduction)
- [🙋 My Role](#-my-role)
- [🔎 Detail](#-detail)
- [💡 Review](#-review)
- [✔ To Do List](#-to-do-list)

<br />
<br />
<br />

# 📖 Introduction

### 1. 프로젝트 개요

방탈출 평점 후기 블로그
<br />

### 2. 개발 환경
<div align=left> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazon ec2&logoColor=white">
  <img src="https://img.shields.io/badge/pm2-2B037A?style=for-the-badge&logo=pm2&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/json web tokens-000000?style=for-the-badge&logo=json web tokens&logoColor=white">
  <img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/github actions-2088FF?style=for-the-badge&logo=github actions&logoColor=white">
  <img src="https://img.shields.io/badge/amazon rds-527FFF?style=for-the-badge&logo=amazon rds&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazon s3&logoColor=white">
  <img src="https://img.shields.io/badge/amazon%20codedeploy-569A31?style=for-the-badge&logo=amazoncodedeploy&logoColor=white" alt="Amazon CodeDeploy">

</div>

### 3. 팀 레퍼런스 주소
[Notion](https://www.notion.so/5-EscapeDiary-9637b15e1d27465ab820e2127e152b45)

[FrontEnd GitHub](https://github.com/hyeon12/escapediary-FE/tree/main)

### 4. 프로젝트 내용

<img src="https://github.com/hyeon12/escapediary-FE/assets/56420106/9dc5c151-0b8f-4d06-9b81-1092a6b50edc" width="300" height="500"/>

<img src="https://github.com/hyeon12/escapediary-FE/assets/56420106/37749b8e-9a78-4556-931b-959596badddc" width="300" height="500"/>

방탈출을 좋아하는 사람들을 위한 **방탈출 후기 웹사이트**
방탈출을 좋아하는 사람들끼리 방탈출에 대한 후기를 남기고 평점을 매겨
서로에게 방탈출을 추천하고 의견을 나눌 수 있는 웹사이트

<br/>

#### 주요 특징

- ⭐ 방탈출 평가를 한눈에
  - 방탈출을 잘 모르는 사람도 한눈에 볼수 있는 별 평점
- 😊 부담없이 웹사이트 방문
  - 로그인을 하지 않아도 게시물 조회가 가능
- 🚫 분탕러는 출입 금지!
  - 로그인을 한 사람만 게시물 작성 가능
- 👮 게시물 보호
  - 자신이 작성한 게시물만 삭제, 수정 가능
- 👁‍🗨 언제 어디서나 웹사이트에서 확인 가능
  - 테스크탑, 태블릿, 스마트폰 반응형 구현

<br />
<br />
<br />

# 🙋 My Role

### 1. 담당 업무

![신성윤](https://github.com/hyeon12/reactH99TestThree/assets/56420106/4dd285c0-0048-4c85-bf32-81ceb7ec6a02) <img src="https://github.com/hyeon12/escapediary-FE/assets/56420106/d0eed55d-76c8-4e65-a276-7c6aab9a5ab6" width="100" height="150"/> ![image](https://github.com/hyeon12/reactH99TestThree/assets/56420106/be2a43b6-b7a6-4a7f-94f7-be23a8b574f1) ![Alt text](image.png)

- 💖 신성윤: 백엔드 💖
- 💖 김승훈: 백엔드 💖
- 💖 이소현: 프론트 💖
- 💖 손규리: 프론트 💖
  <br/>

#### 주요 특징

- 신성윤: 나는야 멋쟁이 조장, 마스터피스, 코딩좀비
- 김승훈: 신성윤 직속 1번 대장
- 이소현: 5조 자칭 분위기 메이커
- 손규리: 겸손 = 규리

#### 백엔드 업무 역할

| 이름 | 담당 파트 |
| --- | --------- |
| 신성윤 | CI/CD 구축 및 배포 안정화, Https 연결, 테스트코드 작성(진행중) |
| 김승훈 | 회원가입, 로그인, 게시글 CRUD 기능 구현 |


<br />
<br />
<br />

# 🔎 Detail

### 주요 코드

- JWT토큰 생성

  ```js
  router.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    const existUser = await Users.findOne({ where: { id } });
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

  ```
- JWT토큰 검증

  ```js
  const verifyToken = async (req, res, next) => {
    console.log(req.cookies);
  
    if (!req.cookies || typeof req.cookies !== 'object') {
      console.error('쿠키를 찾을 수 없습니다');
      res.status(401).send({ errorMessage: '쿠키를 찾을 수 없습니다' });
      return;
    }

  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization ?? '').split(' ');
  try {
    if (!authToken) {
      res.status(401).send({
        errorMessage: '올바르지 않은 토큰입니다.',
      });
      return;
    }
    if (authType !== 'Bearer') {
      res.status(402).send({
        errorMessage: '쿠키를 불러오는데 실패하였습니다.',
      });
    }
  ```

  쿠키가 없거나 쿠키의 타입이 객체 타입이 아닌 경우는 오류를 발생시키도록 작성.
  


- 미들웨어 순서

  ```js
  app.use(
  cors({
    origin: [
      'https://escapediary-fe-snowy.vercel.app',
      'https://escapediary-fe.vercel.app',
    ],
    credentials: true,
  })
  );

  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use('/api', routes);
  ```

  '/api' 로 들어가기전에 'cors 미들웨어'를 적용해야 함.

    <br>



<!-- # 💡 Review

### 1. 후기

- 프로젝트 완료 후 **후기**를 작성합니다.
- **협업**을 통해 얻은 **고찰**을 위주로 기입합니다.

<br />
<br />

### 2. 코드 리뷰

- 보완점이 있는 코드를 **리뷰**합니다.

<br />
<br />
<br /> -->

# ✔ To Do List

- [x] **필수 기능**

  - [x] 게시글 조회
  - [x] 게시글 생성
  - [x] 게시글 상세보기

  <br />

- [x] **1차 기능구현**

  - [x] 회원가입
  - [x] 로그인

  <br />

- [x] **2차 기능구현**

  - [x] 게시글 수정
  - [x] 게시물 삭제

  <br />

- [ ] **3차 기능구현**
  - [ ] 댓글 조회
  - [ ] 댓글 생성
  - [ ] 댓글 수정
  - [ ] 댓글 삭제
  - [ ] 페이지네이션
