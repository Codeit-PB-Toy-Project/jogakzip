const Comment = require('./comment-model');
const Post = require('../posts/post-model');
const { hashPassword, comparePassword } = require('../../utils/password-util');
const AppError = require('../../utils/app-error');

// 댓글 등록
exports.createComment = async(postId, nickname, content, password) => {
  // postId로 해당 Post가 있는지 확인
  const post = await Post.findOne({ id: postId });
  if (!post) throw new AppError('존재하지 않습니다', 404);

  // 비밀번호 해싱
  const hashedPassword = await hashPassword(password);

  // 댓글 ID 계산
  const maxIdComment = await Comment.findOne().sort({ id: -1 }).exec();
  const newId = maxIdComment ? maxIdComment.id + 1 : 1;  // 최대 id + 1 계산

  // 새 댓글 생성
  const newComment = new Comment({
    id: newId,
    postId,
    nickname,
    content,
    password: hashedPassword,
  });

  const savedComment = await newComment.save();

  // 응답 데이터
  return {
    id: savedComment.id,
    nickname: savedComment.nickname,
    content: savedComment.content,
    createdAt: savedComment.createdAt,
  };
};


// 댓글 목록 조회
exports.getComments = async (postId, page, pageSize) => {

  const skip = (page - 1) * pageSize;

  const totalItemCount = await Comment.countDocuments({ postId });

  const comments = await Comment.find({ postId })
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: 1 });

  const totalPages = Math.ceil(totalItemCount / pageSize);

  // 응답 데이터
  return {
    currentPage: page,
    totalPages,
    totalItemCount,
    data: comments.map(comment => ({
      id: comment.id,
      nickname: comment.nickname,
      content: comment.content,
      createdAt: comment.createdAt,
    })),
  };
};


// 댓글 수정
exports.updateComment = async (commentId, nickname, content, password) => {
  
  const comment = await Comment.findOne({ id: commentId });

  if (!comment) throw new AppError('존재하지 않습니다', 404);

  const isPasswordValid = await comparePassword(password, comment.password);
  if (!isPasswordValid) throw new AppError('비밀번호가 틀렸습니다', 403);

  const updatedComment = await Comment.findOneAndUpdate(
    { id: commentId },
    { $set: { nickname, content } }, // 업데이트할 필드
    { new: true, runValidators: true } // 새로운 문서를 반환하고 유효성 검사 실행
  );

  // 응답 데이터
  return {
    id: updatedComment.id,
    nickname: updatedComment.nickname,
    content: updatedComment.content,
    createdAt: updatedComment.createdAt,
  };
};

// 댓글 삭제
exports.deleteComment = async (commentId, password) => {
  const comment = await Comment.findOne({ id: commentId });
  if (!comment) throw new AppError('존재하지 않습니다', 404);

  const isPasswordValid = await comparePassword(password, comment.password);
  if (!isPasswordValid) throw new AppError('비밀번호가 틀렸습니다', 403);

  await Comment.findOneAndDelete({ id: commentId });

  // 응답 데이터
  return { message: '댓글 삭제 성공' };
};