const express = require("express");
const { uploadImage, getImages, deleteImage, getAllImages} = require('../controllers/imageController')

const upload = require("../middleware/upload");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadImage);
router.get("/allimages", getAllImages);
router.get("/:filename", getImages);
router.delete("/:filename", deleteImage);

module.exports = router;