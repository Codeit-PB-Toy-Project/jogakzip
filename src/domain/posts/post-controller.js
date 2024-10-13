const postService = require('./post-service');
const handleError = require('../../middleware/handle-error');

// 게시글 생성
exports.createPost = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const requestData = req.body; // groupPassword를 제외한 나머지 데이터를 받음
    const responseData = await postService.createPost(requestData, groupId);

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(400).json({ message: '잘못된 요청입니다' });
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const postUpdateData = req.body;

  try {
    const responseData = await postService.updatePost(postId, postUpdateData);
    return res.status(200).json(responseData);
  } catch (error) {
    handleError(res, error);
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const { postPassword } = req.body;

  try {
    const result = await postService.deletePost(postId, postPassword);
    return res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

// 게시글 공개 여부 확인
exports.isPostPublic = async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await postService.getPostIsPublic(postId);
    return res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

// 게시글 조회 권한 확인
exports.verifyPostPassword = async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;

  try {
    const isPasswordValid = await postService.verifyPostPassword(postId, password);

    if (isPasswordValid) {
      return res.status(200).json({ message: '비밀번호가 확인되었습니다' });
    } else {
      return res.status(401).json({ message: '비밀번호가 틀렸습니다' });
    }
  } catch (error) {
    handleError(res, error);
  }
};

// 게시글 공감하기
exports.likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    await postService.likePost(postId);
    return res.status(200).json({ message: '게시글 공감하기 성공' });
  } catch (error) {
    handleError(res, error);
  }
};

// 게시글 상세 정보 조회
exports.getPostDetails = async (req, res) => {
  const { postId } = req.params;

  try {
    const responseData = await postService.getPostDetails(postId);
    return res.status(200).json(responseData);
  } catch (error) {
    handleError(res, error);
  }
};

// 게시글 목록 조회
exports.getPosts = async (req, res) => {
  const { groupId } = req.params;
  const { page = 1, pageSize = 8, sortBy = 'mostLiked', keyword, isPublic} = req.query;

  // 문자열로 들어오는 isPublic 값을 boolean으로 변환하고 기본값 설정
  const isPublicBoolean = (isPublic === undefined || isPublic === '') ? true : isPublic === 'true';

  try {
    const result = await postService.getPosts(Number(groupId), Number(page), Number(pageSize), sortBy, keyword, isPublicBoolean);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(400).json({ message: '잘못된 요청입니다' });
  }
};