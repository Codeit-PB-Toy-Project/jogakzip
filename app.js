const express = require('express');
const { connectDB } = require('./src/config/db');
const cors = require('cors');
const corsOptions = require('./src/config/cors');
const morgan = require('morgan');
const { handleError } = require('./src/middleware/handle-error');

const app = express();

// MongoDB Atlas와 연결
connectDB();

// CORS 미들웨어
app.use(cors(corsOptions));

// morgan
app.use(morgan('dev'));

// JSON 파싱 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* 라우터 설정 */
// 게시글
app.use('/api', require('./src/domain/posts/post-route'));

// 400 처리 미들웨어
app.use((req, res) => {
  res.status(400).json({ message: '잘못된 요청입니다'})
});

// 에러 핸들러 미들웨어
app.use((err, req, res, next) => {
  handleError(res, err);
});

/*
// 기본 경로
app.get('/', (req, res) => {
  res.send('Hello!');
});
*/

module.exports = app;