const express = require('express');
const { connectDB } = require('./src/config/db');
const cors = require('cors');
const corsOptions = require('./src/config/cors');

const app = express();

// MongoDB Atlas와 연결
connectDB();

// CORS 미들웨어 사용
app.use(cors(corsOptions));

// JSON 파싱 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


/*
// 기본 경로
app.get('/', (req, res) => {
  res.send('Hello!');
});
*/

module.exports = app;