const express = require('express');
const fileUpload = require('express-fileupload');
const { connectDB } = require('./src/config/db');
const cors = require('cors');
const corsOptions = require('./src/config/cors');
const groupRoutes = require('./src/domain/groups/group-route');
const imageRoutes = require('./src/domain/images/image-route');

const app = express();

// MongoDB Atlas와 연결
connectDB();

// CORS 미들웨어 사용
app.use(cors(corsOptions));

// JSON 파싱 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// 파일 업로드 미들웨어 사용
app.use(fileUpload());

// 이미지 업로드 경로 설정
app.use('/api/image', imageRoutes);

// 그룹 관련 API 라우트 설정
app.use('/api/groups', groupRoutes);

/*
// 기본 경로
app.get('/', (req, res) => {
  res.send('Hello!');
});
*/

module.exports = app;