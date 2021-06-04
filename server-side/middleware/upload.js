const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const urls = require("../config/key");

const storage = new GridFsStorage({
    url: urls.MONGO_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: async (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${file.originalname}`;
            return filename;
        }
        return {
            // bucketName: "photos", //for custom file name default file name will be fs by GridFsStorage
            filename: `${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });
