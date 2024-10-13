const Post = require('./post-model');
const { hashPassword } = require('../../utils/password-util');
const AppError = require('../../utils/app-error');
const bcrypt = require('bcrypt');

// 게시글 생성
exports.createPost = async (requestData, groupId) => {
  const {
    nickname, title, content, imageUrl, tags, location,
    moment, isPublic, postPassword
  } = requestData;

  // postPassword 해싱
  const hashedPostPassword = await hashPassword(postPassword);

  // post의 Id 계산
  const maxIdPost = await Post.findOne().sort({ id: -1 }).exec();
  const newId = maxIdPost ? maxIdPost.id + 1 : 1;  // 최대 id + 1
  
  // 게시글 생성
  const newPost = new Post({
    id: newId,
    groupId,
    nickname,
    title,
    content,
    imageUrl,
    tags,
    location,
    moment,
    isPublic,
    likeCount: 0,
    commentCount: 0,
    postPassword: hashedPostPassword
  });

  await newPost.save();

  return {
    id: newPost.id,
    groupId: groupId,
    nickname: newPost.nickname,
    title: newPost.title,
    content: newPost.content,
    imageUrl: newPost.imageUrl,
    tags: newPost.tags,
    location: newPost.location,
    moment: newPost.moment,
    isPublic: newPost.isPublic,
    likeCount: newPost.likeCount,
    commentCount: newPost.commentCount,
    createdAt: newPost.createdAt,
  };
};

// 게시글 수정
exports.updatePost = async (postId, postUpdateData) => {
  const validFields = ['nickname', 'title', 'content', 'postPassword', 'imageUrl', 'tags', 'location', 'moment', 'isPublic'];

  // 400 Bad Request (요청 양식 오류)
  if (!postUpdateData.postPassword) {
    throw new AppError('잘못된 요청입니다', 400);
  }

  const invalidFields = Object.keys(postUpdateData).filter(field => !validFields.includes(field));
  if (invalidFields.length > 0) {
    throw new AppError('잘못된 요청입니다', 400);
  }

  const post = await Post.findOne({ id: postId });

  // 404 Not Found
  if (!post) {
    throw new AppError('존재하지 않습니다', 404);
  }

  // 403 Forbidden (비밀번호 오류) - postUpdateData의 비밀번호를 해시한 후 비교해야 함
  const isPasswordValid = await bcrypt.compare(postUpdateData.postPassword, post.postPassword);
  if (!isPasswordValid) {
    throw new AppError('비밀번호가 틀렸습니다', 403);
  }

  // 업데이트된 게시글 정보
  const updatedPost = await Post.findOneAndUpdate(
    { id: postId },
    {
      $set: {
        nickname: postUpdateData.nickname,
        title: postUpdateData.title,
        content: postUpdateData.content,
        imageUrl: postUpdateData.imageUrl,
        tags: postUpdateData.tags,
        location: postUpdateData.location,
        moment: postUpdateData.moment,
        isPublic: postUpdateData.isPublic,
      }
    },
    { new: true } // 업데이트된 게시글 반환
  );

  return {
    id: updatedPost.id,
    groupId: updatedPost.groupId,
    nickname: updatedPost.nickname,
    title: updatedPost.title,
    content: updatedPost.content,
    imageUrl: updatedPost.imageUrl,
    tags: updatedPost.tags,
    location: updatedPost.location,
    moment: updatedPost.moment,
    isPublic: updatedPost.isPublic,
    likeCount: updatedPost.likeCount,
    commentCount: updatedPost.commentCount,
    createdAt: updatedPost.createdAt,
  };
};


// 게시글 삭제
exports.deletePost = async (postId, postPassword) => {

  // 400 Bad Request (요청 양식 오류)
  if (!postPassword) {
    throw new AppError('잘못된 요청입니다', 400);
  }

  const post = await Post.findOne({ id: postId });

  // 404 Not Found
  if (!post) {
    throw new AppError('존재하지 않습니다', 404);
  }

  // 비밀번호 오류
  const isPasswordValid = await bcrypt.compare(postPassword, post.postPassword);
  if (!isPasswordValid) {
    throw new AppError('비밀번호가 틀렸습니다', 403);
  }

  await Post.findOneAndDelete({ id: postId });

  return { message: '게시글 삭제 성공' };
};


// 게시글 공개 여부 확인
exports.getPostIsPublic = async (postId) => {
  const post = await Post.findOne({ id: postId });

  if (!post) {
    throw new AppError('존재하지 않습니다', 404);
  }

  return {
    id: post.id,
    isPublic: post.isPublic,
  };
};


// 게시글 조회 권한 확인
exports.verifyPostPassword = async (postId, password) => {
  const post = await Post.findOne({ id: postId });

  const isPasswordValid = await bcrypt.compare(password, post.postPassword);

  return isPasswordValid;
};

// 게시글 공감하기
exports.likePost = async (postId) => {
  const post = await Post.findOne({ id: postId });

  if (!post) {
    throw new AppError('존재하지 않습니다', 404);
  }

  post.likeCount += 1;

  await post.save();
};

// 게시글 상세 정보 조회
exports.getPostDetails = async (postId) => {
  
  if (isNaN(postId)) {
    throw new AppError('잘못된 요청입니다', 400);
  }

  const post = await Post.findOne({ id: postId });

  // 404 Not Found
  if (!post) {
    throw new AppError('존재하지 않습니다', 404);
  }

  return {
    id: post.id,
    groupId: post.groupId,
    nickname: post.nickname,
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl,
    tags: post.tags,
    location: post.location,
    moment: post.moment,
    isPublic: post.isPublic,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    createdAt: post.createdAt,
  };
};


// 게시글 목록 조회 
exports.getPosts = async (groupId, page, pageSize, sortBy, keyword, isPublic) => {
  const query = { groupId };

  // 공개 여부
  if (isPublic !== undefined) {
    query.isPublic = isPublic;
  }   

  // 검색어
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { tags: { $elemMatch: { $regex: keyword, $options: 'i' } } }
    ];
  }

  // 정렬 기준
  let sort = {};
  if (sortBy === 'latest') {
    sort.createdAt = -1; // 최신순
  } else if (sortBy === 'mostCommented') {
    sort.commentCount = -1; // 댓글 많은 순
  } else if (sortBy === 'mostLiked') {
    sort.likeCount = -1; // 공감 많은 순
  }

  console.log('Query:', query);
  console.log('Sort:', sort);
  console.log('Page:', page, 'PageSize:', pageSize);

  // 게시글 조회 및 페이지네이션 적용
  const posts = await Post.find(query)
    .sort(sort)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  console.log('Queried Posts:', posts);
    
  // 총 아이템 수 계산
  const totalItemCount = await Post.countDocuments(query);
  
  console.log('Total Item Count:', totalItemCount);

  // 페이지 수 계산
  const totalPages = Math.ceil(totalItemCount / pageSize);
  
  console.log('Total Pages:', totalPages);

  return {
    currentPage: page,
    totalPages,
    totalItemCount,
    data: posts.map(post => ({
      id: post.id,
      nickname: post.nickname,
      title: post.title,
      imageUrl: post.imageUrl,
      tags: post.tags,
      location: post.location,
      moment: post.moment,
      isPublic: post.isPublic,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      createdAt: post.createdAt
    })),
  };
};