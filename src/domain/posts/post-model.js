const mongoose = require('mongoose');

// 날짜 변환 함수
const toKST = (date) => {
  return new Date(date.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
};

const postSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  groupId: { type: Number, required: true },
  nickname: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  tags: [{ type: String }],
  location: { type: String, required: true },
  moment: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  likeCount: { type: Number, default: 0, required: true },
  commentCount: { type: Number, default: 0, required: true },
  postPassword: { type: String, required: true },
}, { timestamps: true });

// pre-save 훅
postSchema.pre('save', function(next) {
  // 현재 시간을 KST로 변환
  const nowKST = toKST(new Date());

  // createdAt과 updatedAt을 KST로 설정
  this.createdAt = nowKST; // 항상 KST로 설정
  this.updatedAt = nowKST; // 항상 KST로 설정

  next();
});

// pre-findOneAndUpdate 훅
postSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();

  // 현재 시간을 KST로 변환하여 updatedAt 설정
  const nowKST = toKST(new Date());
  update.updatedAt = nowKST; // KST로 updatedAt 설정

  next();
});

module.exports = mongoose.model('Post', postSchema);
