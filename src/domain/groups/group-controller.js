const groupService = require('./group-service');

// 그룹 생성
const createGroup = async (req, res) => {
    try {
        const group = await groupService.createGroup(req.body);
        const response = {
            id: group.id,  // MongoDB ObjectId를 id로 매핑
            name: group.name,
            imageUrl: group.imageUrl,
            isPublic: group.isPublic,
            likeCount: group.likeCount,
            badges: group.badges,
            postCount: group.postCount,
            createdAt: group.createdAt,
            introduction: group.introduction
        };
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 ID로 그룹 조회
const getGroupById = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.groupId);
        if (group) {
            const response = {
                id: group.id,  // MongoDB ObjectId를 id로 매핑
                name: group.name,
                imageUrl: group.imageUrl,
                isPublic: group.isPublic,
                likeCount: group.likeCount,
                badges: group.badges,
                postCount: group.postCount,
                createdAt: group.createdAt,
                introduction: group.introduction
            };
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: '존재하지 않습니다' });
        }
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 수정
const updateGroup = async (req, res) => {
    try {
        const group = await groupService.updateGroup(req.params.groupId, req.body);
        const response = {
            id: group.id,  // MongoDB ObjectId를 id로 매핑
            name: group.name,
            imageUrl: group.imageUrl,
            isPublic: group.isPublic,
            likeCount: group.likeCount,
            badges: group.badges,
            postCount: group.postCount,
            createdAt: group.createdAt,
            introduction: group.introduction
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 목록 조회
const listGroups = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, sortBy = 'latest', keyword = '', isPublic } = req.query;
        const filter = {
            name: { $regex: keyword, $options: 'i' },
            isPublic: isPublic !== undefined ? isPublic : { $exists: true }
        };
        const groups = await groupService.listGroups(filter, { page, pageSize, sortBy });
        const response = groups.map(group => ({
            id: group.id,  // MongoDB ObjectId를 id로 매핑
            name: group.name,
            imageUrl: group.imageUrl,
            isPublic: group.isPublic,
            likeCount: group.likeCount,
            badges: group.badges,
            postCount: group.postCount,
            createdAt: group.createdAt,
            introduction: group.introduction
        }));
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 삭제
const deleteGroup = async (req, res) => {
    try {
        const deletedGroup = await groupService.deleteGroup(req.params.groupId);
        if (deletedGroup) {
            res.status(200).json({ message: '그룹 삭제 성공' });
        } else {
            res.status(404).json({ message: '존재하지 않습니다' });
        }
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 조회 권한 확인 (비밀번호 확인)
const verifyGroupPassword = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }
        if (group.password === req.body.password) {
            const response = {
                id: group._id,  // MongoDB ObjectId를 id로 매핑
                name: group.name,
                imageUrl: group.imageUrl,
                isPublic: group.isPublic,
                likeCount: group.likeCount,
                badges: group.badges,
                postCount: group.postCount,
                createdAt: group.createdAt,
                introduction: group.introduction
            };
            return res.status(200).json({ message: '비밀번호가 확인되었습니다', group: response });
        } else {
            return res.status(401).json({ message: '비밀번호가 틀렸습니다' });
        }
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 공감하기 (like)
const likeGroup = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }
        group.likeCount += 1;
        await group.save();
        const response = {
            id: group._id,  // MongoDB ObjectId를 id로 매핑
            name: group.name,
            imageUrl: group.imageUrl,
            isPublic: group.isPublic,
            likeCount: group.likeCount,
            badges: group.badges,
            postCount: group.postCount,
            createdAt: group.createdAt,
            introduction: group.introduction
        };
        res.status(200).json({ message: '그룹 공감하기 성공', group: response });
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 공개 여부 확인
const getGroupPublicStatus = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }

        // 응답 데이터 구성
        const response = {
            id: group.id,  // MongoDB ObjectId를 id로 매핑
            isPublic: group.isPublic
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

module.exports = {
    createGroup,
    getGroupById,
    updateGroup,
    deleteGroup,
    listGroups,
    verifyGroupPassword,
    likeGroup,
    getGroupPublicStatus
};

/*

const groupService = require('./group-service');

// 그룹 생성
const createGroup = async (req, res) => {
    try {
        const group = await groupService.createGroup(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 ID로 그룹 조회
const getGroupById = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.groupId);
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).json({ message: '존재하지 않습니다' });
        }
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 수정
const updateGroup = async (req, res) => {
    try {
        const group = await groupService.updateGroup(req.params.groupId, req.body);
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 삭제
const deleteGroup = async (req, res) => {
    try {
        await groupService.deleteGroup(req.params.groupId);
        res.status(200).json({ message: '그룹 삭제 성공' });
    } catch (error) {
        res.status(404).json({ message: '존재하지 않습니다' });
    }
};

// 그룹 목록 조회
const listGroups = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, sortBy = 'latest', keyword = '', isPublic } = req.query;
        const filter = {
            name: { $regex: keyword, $options: 'i' },
            isPublic: isPublic !== undefined ? isPublic : { $exists: true }
        };
        const groups = await groupService.listGroups(filter, { page, pageSize, sortBy });
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 조회 권한 확인 (비밀번호 확인)
const verifyGroupPassword = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }
        if (group.password === req.body.password) {
            return res.status(200).json({ message: '비밀번호가 확인되었습니다' });
        } else {
            return res.status(401).json({ message: '비밀번호가 틀렸습니다' });
        }
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

// 그룹 공감하기 (like)
const likeGroup = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }
        group.likeCount += 1;
        await group.save();
        res.status(200).json({ message: '그룹 공감하기 성공' });
    } catch (error) {
        res.status(400).json({ message: '잘못된 요청입니다' });
    }
};

module.exports = {
    createGroup,
    getGroupById,
    updateGroup,
    deleteGroup,
    listGroups,
    verifyGroupPassword,
    likeGroup
};

*/