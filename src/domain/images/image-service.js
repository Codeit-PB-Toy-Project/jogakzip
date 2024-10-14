const path = require('path');
const fs = require('fs');

const uploadImage = (image) => {
    // 이미지 저장 경로 설정 (예: 'uploads/' 폴더에 저장)
    const uploadPath = path.join(__dirname, '../../uploads', image.name);

    // 이미지 파일을 해당 경로로 저장
    return new Promise((resolve, reject) => {
        image.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            const imageUrl = `/uploads/${image.name}`;
            resolve(imageUrl);
        });
    });
};

module.exports = {
    uploadImage
};
