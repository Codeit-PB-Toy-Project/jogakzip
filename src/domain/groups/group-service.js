const Group = require('./group-model');

// 그룹 생성
const createGroup = async (groupData) => {
    const group = new Group(groupData);
    return await group.save();
};

// 그룹 ID로 그룹 조회
const getGroupById = async (groupId) => {
    return await Group.findById(groupId);
};

// 그룹 목록 조회
const listGroups = async (filter, options) => {
    const { page, pageSize, sortBy } = options;
    const sortOptions = {
        latest: { createdAt: -1 },
        mostPosted: { postCount: -1 },
        mostLiked: { likeCount: -1 },
        mostBadge: { badges: -1 }
    };

    return await Group.find(filter)
        .sort(sortOptions[sortBy])
        .skip((page - 1) * pageSize)
        .limit(pageSize);
};

// 그룹 수정
const updateGroup = async (groupId, groupData) => {
    return await Group.findByIdAndUpdate(groupId, groupData, { new: true });
};

// 그룹 삭제
const deleteGroup = async (groupId) => {
    return await Group.findByIdAndDelete(groupId);
};

// 그룹 조회 권한 확인 (비밀번호 확인)
const verifyPassword = async (groupId, password) => {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found');
    }
    return group.password === password;
};

// 그룹 공감하기 (like)
const likeGroup = async (groupId) => {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found');
    }
    group.likeCount += 1;
    return await group.save();
};

// 그룹 공개 여부 확인
const getGroupPublicStatus = async (groupId) => {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found');
    }
    return {
        id: group.id,
        isPublic: group.isPublic
    };
};

module.exports = {
    createGroup,
    getGroupById,
    listGroups,
    updateGroup,
    deleteGroup,
    verifyPassword,
    likeGroup,
    getGroupPublicStatus
};
