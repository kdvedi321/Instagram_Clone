const express = require("express");
const app = express();
// let userDB = require("./user.json");
const fs = require("fs");
const path = require("path");
const userRouter = require("./router/userRouter");
// to send static resources to client
app.use(express.static("view"));
const postRouter = require("./router/postRouter");
// const postRouter = require("./router/postRouter");
// app.use(function(req, res, next){
//     console.log("1st");
//     console.log("Line no 17 "+req.body);
//     // req.user = "assdfghhj"
//     console.log(req);
//     console.log("`````````````````");
//     next();
// })
app.use(express.json());
// app.use(function(req, res, next){
//     console.log("2nd");
//     console.log("Line number 25");
//     console.log(req.body);
//     console.log("``````````````````````````````````");
//     next();
// })
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);
// app.use("/api/post", postRouter);
// *****************POST************************
// localhost:4000/api/users
app.listen(4000, function(){
    console.log("Express_Server is listening at port 4000");
})