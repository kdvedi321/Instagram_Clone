const express = require("express");
const app = express();
const multer = require("multer");
app.use(express.json());
app.use(express.static());
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }
})
const fileFilter = function(req, file, cb){
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }else{
        cb(new Error('Not an image'))
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
app.post("/uploadMedia", upload.single("photo"), function(req, res){
    console.log(req.body);
    let img = req.file;
    res.status(200).json({
        "message": "file received"
    })
})
app.listen(4000, console.log("Server started at port 4000"));