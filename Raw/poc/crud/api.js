const express = require("express");
const app = express();
const userDB = require("./user.json");
const fs = require("fs");
const path = require("path");  
// REST API
// HTTP request =>
// create => POST
// read => GET
// app.get("/api/users", function(req, res){
//     console.log("Received req");
//     res.status(200).json({
//         status: "status received get request from client",
//     })
// })
app.use(express.json());
app.post("/api/users/", function(req, res){
    let user = req.body;
    // db Save
    // console.log(user);
    // if a new entry is created on server
    // memoery -> ram
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    res.status(201).json({
        sucess : "successfull",
        user: user
    })
})
// update => PATCH
// delete => DELETE
// localhost  : 3000/api/users
app.get("api/users/:user_id", function(req, res){
    let {user_id} = req.params;
    let user;
    for(let i=0;i<userDB.length;i++){
        if(userDB[i].user_id == user_id){
            user = userDB[i];
        }
    }
    res.status(200).json({
        status: "success",
       user: user != undefined ? user : "no user"
    })
})
app.patch("/api/users/:user_id", function(req, res){
    let { user_id } = req.params;
    let user;
    let toUpdate = req.body;
    for(let i=0;i<userDB.length;i++){
        if(userDB[i].user_id == user_id){
            user = userDB[i];
        }
    }
    res.status(200).json({
        status: "success",
        user: user != undefined ? user : "no user"
    })
})
// app.delete("/api/users/:user_id", function(req, res){

// })
app.listen(3000, function(){
    console.log("Server is listening at port 3000");
})
