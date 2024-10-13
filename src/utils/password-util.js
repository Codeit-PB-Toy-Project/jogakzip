const bcrypt = require('bcrypt');

// 비밀번호 해싱
const hashPassword = async (password) => {
  const saltRounds = 10; // 해싱 복잡도
  const salt = await bcrypt.genSalt(saltRounds); // salt 생성
  const hashedPassword = await bcrypt.hash(password, salt); // 비밀번호 해싱
  return hashedPassword;
};

// 비밀번호 검증 (입력된 비밀번호와 해시된 비밀번호 비교)
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};