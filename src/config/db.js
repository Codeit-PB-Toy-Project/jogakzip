const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB 연결 URI
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority';

// DB 연결
const connectDB = async () => {
  try {
    // Mongoose를 사용한 MongoDB Atlas 연결
    await mongoose.connect(mongoURI);
    console.log('MongoDB 연결 성공');
  } catch (err) {
    console.error('MongoDB 연결 실패:', err);
    process.exit(1); // 연결 실패 시 서버 종료
  }
};

// DB 연결 해제
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB 연결 해제');
  } catch (err) {
    console.error('MongoDB 연결 해제 실패:', err);
  }
};

// DB 상태 확인
const checkDBStatus = () => {
  const connectionState = mongoose.connection.readyState; // 현재 연결 상태를 가져옴
  switch (connectionState) {
    case 0:
      console.log('MongoDB와의 연결 상태: 연결 안됨 (disconnected)');
      break;
    case 1:
      console.log('MongoDB와의 연결 상태: 연결됨 (connected)');
      break;
    case 2:
      console.log('MongoDB와의 연결 상태: 연결 중 (connecting)');
      break;
    case 3:
      console.log('MongoDB와의 연결 상태: 연결 해제 중 (disconnecting)');
      break;
    default:
      console.log('MongoDB와의 연결 상태: 알 수 없는 상태');
      break;
  }
};


module.exports = {
  connectDB,
  disconnectDB,
  checkDBStatus,
};
