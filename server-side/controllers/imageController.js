const mongoose = require('mongoose');
const Grid = require("gridfs-stream");

let gfs;
const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection("fs");
});

// const imageAlreadyExist = async (fileName) => {
//     const file = await gfs.files.findOne({ filename: fileName });
//     return file;
// }

const uploadImage = async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
    return res.send(imgUrl);
}

const getImages = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send({error});
    }
}

const getAllImages = async (req, res) => {
    try {
        let fileNames = await gfs.files.find();
        let fileArr = await fileNames.toArray();
        const readStream = gfs.createReadStream(fileArr[0].filename);
        readStream.pipe(res);
    } catch (error) {
        res.send({error});
    }
}

const deleteImage = async (req, res) => {
    gfs.exist({ filename: req.params.filename }, function (err, file) {
        if (err || !file) {
            res.send('File Not Found');
        } else {
            gfs.remove({ filename: req.params.filename }, function (err) {
                if (err) res.send(err);
                res.send({message: 'File Deleted', file});
            });
        }
    });
}

module.exports = { uploadImage, getImages, deleteImage, getAllImages };