const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

const routes = require('./routes/index.js'); //! 여기 수정 해봄

const dotenv = require('dotenv');
dotenv.config();

// app.use(cors())
// post 됨 A-O 별표로 뜸
// 로그인 됬고 쿠키는 없고

app.use(
  cors({
    origin: 'https://escapediary-fe-snowy.vercel.app',
    credentials: true,

    // origin: '*',
    // credentials: true,
  })
);
// 됨. 인증 써놓으니까 쿠키도 넘어감 보관도 되고

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', routes);

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`${process.env.PORT || 3000} 포트에 접속 되었습니다.`);
});
