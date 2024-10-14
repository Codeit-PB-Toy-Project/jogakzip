const imageService = require('./image-service');

const uploadImage = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: '이미지가 업로드되지 않았습니다.' });
        }
        const image = req.files.image;
        const imageUrl = await imageService.uploadImage(image);
        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: '이미지 업로드 중 오류가 발생했습니다.' });
    }
};

module.exports = {
    uploadImage
};
