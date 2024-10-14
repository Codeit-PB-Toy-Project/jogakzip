const mongoose = require('mongoose');

// 날짜 변환 함수
const toKST = (date) => {
  return new Date(date.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
};

// 댓글 스키마 정의
const commentSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // 댓글 ID
  postId: { type: Number, required: true },  // 게시글 ID
  nickname: { type: String, required: true },  // 닉네임
  content: { type: String, required: true },  // 댓글 내용
  password: { type: String, required: true },  // 댓글 비밀번호 (bcrypt로 해시)
}, { timestamps: true });


// pre-save 훅
commentSchema.pre('save', function(next) {
  // 현재 시간을 KST로 변환
  const nowKST = toKST(new Date());

  // createdAt과 updatedAt을 KST로 설정
  this.createdAt = nowKST; // 항상 KST로 설정
  this.updatedAt = nowKST; // 항상 KST로 설정

  next();
});

// pre-findOneAndUpdate 훅
commentSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();

  // 현재 시간을 KST로 변환하여 updatedAt 설정
  const nowKST = toKST(new Date());
  update.updatedAt = nowKST; // KST로 updatedAt 설정

  next();
});


// 모델 생성
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
