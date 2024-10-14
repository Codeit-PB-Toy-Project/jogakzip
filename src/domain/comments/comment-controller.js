const commentService = require('./comment-service');
const AppError = require('../../utils/app-error');
const handleError = require('../../middleware/handle-error');

// 댓글 등록
exports.createComment = async (req, res) => {
  const { postId } = req.params;
  const { nickname, content, password } = req.body;

  try {
    const commentData = await commentService.createComment(postId, nickname, content, password);
    return res.status(200).json(commentData);
  } catch (error) {
    return res.status(400).json({ message: '잘못된 요청입니다' });
  }
};

// 댓글 목록 조회
exports.getComments = async (req, res) => {
  const { postId } = req.params;
  const { page = 1, pageSize = 3 } = req.query;

  try {
    const commentsData = await commentService.getComments(postId, Number(page), Number(pageSize));
    return res.status(200).json(commentsData);
  } catch (error) {
    return res.status(400).json({ message: '잘못된 요청입니다' });
  }
};

// 댓글 수정
exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { nickname, content, password } = req.body;

  try {
    const updatedCommentData = await commentService.updateComment(commentId, nickname, content, password);
    return res.status(200).json(updatedCommentData);
  } catch (error) {
    handleError(res, error);
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { password } = req.body;

  try {
    const result = await commentService.deleteComment(commentId, password);
    return res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};
