const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:' + PORT, 
  'https://project-zogakzip-fe.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    // 요청의 출처가 허용된 도메인 목록에 있으면 허용
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // 허용
    } else {
      callback(new Error('Not allowed by CORS')); // 허용되지 않음
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
  credentials: true, // 쿠키와 인증 정보를 포함할지 여부
  optionsSuccessStatus: 200, // 구형 브라우저를 위한 옵션
};

module.exports = corsOptions;