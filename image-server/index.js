require("dotenv").config();
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');


const upload = require("./routes/upload");

const app = express();
app.use(cors());

let gfs;

mongoose.connect(process.env.DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then( res => {
    console.log('image database connected successfully')
})
.catch(error => console.log("could not connect to database", error));

// const conn = mongoose.connection;
// conn.once("open", function () {
//     gfs = Grid(conn.db, mongoose.mongo)
//     gfs.collection("photos");
// });

app.use("/file", upload);

// media routes
app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send({error});
    }
});

app.delete("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        console.log("file, ", file)
        const {_id} = file;
        const chunk = await gfs.findOne({files_id: _id});
        console.log("chunck, ", chunk)
        await gfs.chunks.findOneAndDelete({files_id: _id});
        await gfs.files.findOneAndDelete({_id});
        res.send({message: 'success'});
    } catch (error) {
        res.send(error);
    }
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
