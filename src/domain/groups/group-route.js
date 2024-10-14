const express = require('express');
const groupController = require('./group-controller');
console.log(groupController); // groupController 객체 확인
const router = express.Router();

// 그룹 생성 (POST /api/groups)
router.post('/', groupController.createGroup);

// 그룹 목록 조회 (GET /api/groups)
router.get('/', groupController.listGroups);

// 그룹 ID로 그룹 조회 (GET /api/groups/:groupId)
router.get('/:groupId', groupController.getGroupById);

// 그룹 수정 (PUT /api/groups/:groupId)
router.put('/:groupId', groupController.updateGroup);

// 그룹 삭제 (DELETE /api/groups/:groupId)
router.delete('/:groupId', groupController.deleteGroup);

// 그룹 조회 권한 확인 (POST /api/groups/:groupId/verify-password)
router.post('/:groupId/verify-password', groupController.verifyGroupPassword);

// 그룹 공감하기 (POST /api/groups/:groupId/like)
router.post('/:groupId/like', groupController.likeGroup);

// 그룹 공개 여부 확인 (GET /api/groups/:groupId/is-public)
router.get('/:groupId/is-public', groupController.getGroupPublicStatus);

module.exports = router;
