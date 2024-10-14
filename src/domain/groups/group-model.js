const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },           // 그룹 이름
    password: { type: String, required: true },       // 그룹 비밀번호
    imageUrl: { type: String },                       // 이미지 URL
    isPublic: { type: Boolean, default: true },       // 공개 여부
    introduction: { type: String },                   // 그룹 소개
    likeCount: { type: Number, default: 0 },          // 좋아요 수
    badges: { type: [String], default: [] },          // 뱃지 목록
    postCount: { type: Number, default: 0 },          // 게시물 수
    createdAt: { type: Date, default: Date.now },     // 생성 일자
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
