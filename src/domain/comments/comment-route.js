const router = require('express').Router();
const commentController = require('./comment-controller');

// 댓글 등록
router.post('/posts/:postId/comments', commentController.createComment);

// 댓글 목록 조회
router.get('/posts/:postId/comments', commentController.getComments);

// 댓글 수정
router.put('/comments/:commentId', commentController.updateComment);

// 댓글 삭제
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;