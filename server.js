// 서버 실행 (포트 설정)
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});