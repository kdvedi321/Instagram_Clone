const express = require("express");
const app = express();
const userDB = require("./user.json");
const postDB = require("./post.json");
const fs = require("fs");
const path = require("path");  
const { create } = require("domain");
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
app.use(function(req, res, next){
    console.log("1st");
    console.log("Line no 17 " + req.body);
    // req.user = "sdasklfsdkbfl";
    console.log(req);
    console.log("`````````````````````````````````````````");
    // console.log(req);
    // console.log(req.user);
    next();
})
app.use(express.json());
app.use(function (req, res, next){
    console.log("2nd");
    console.log("Line number 25");
    console.log(req.body);
    console.log("```````````````````````````````````");
    // console.log(req);
    // console.log(req.user);
    next();
})
const userRouter = new express.Router();
const postRouter = new express.Router();
app.use("/api/users", userRouter);
app.use("/api/post", postRouter);
userRouter.post("/", createUser);
userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);
postRouter.post("/", createPost);
postRouter.route("/:post_id").get(getPost).patch(updatePost).delete(deletePost);
// **************users***************************
function createUser(req, res){
    let user = req.body;
    // db save
    // console.log(user)
    // if a new entry is created on server
    // memory -> ram
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    // res status code server send
    res.status(201).json({
        success : "successfull",
        user : user
    })
}
function getUser(req, res){
    let { user_id } = req.params;
    let user;
    for(let i=0;i<userDB.length;i++){
        if(userDB[i].user_id == user_id){
            user = userDB[i];
        }
    }
    if(user == undefined){
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    res.status(200).json({
        status: "success",
        user: user
    })
}
function updateUser(req, res){
    let { user_id } = req.params;
    let user;
    let toUpdate = req.body;
    for(let i=0;i<userDB.length;i++){
        if(userDB[i].user_id == user_id){
            user = userDB[i];
        }
    }
    if(user == undefined){
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    for(let key in toUpdate){
        user[key] = toUpdate[key];
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    res.satus(200).json({
        status: "success",
        "message" : "message"
    })
}
function deleteUser(req, res){
    let { user_id } = req.params;
    let initialUserL = userDB.length;
    userDB = userDB.filter(function(user){
        return user.user_id != user_id;
    })
    if(initialUserL == userDB.length){
        return res.status(404).json({
            status: "failure",
            messgae: "user not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    res.status(200).json({
        status: "success",
        "message" : "user deleted"
    })
}
function createPost(req, res){
    let post = req.body;
    userDB.push(post);
    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));
    res.status(201).json({
        success: "successfull",
        post: post
    })
}
function getPost(req, res){
    let { post_id } = req.params;
    let post;
    for(let i = 0;i<postDB.length;i++){
        if(postDB[i].post_id == post_id){
            post = postDB[i];
        }
    }
    if(post == undefined){
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }
    res.status(200).json({
        status: "success",
        "message": "message"
    })
}
function updatePost(req, res){
    let { user_id } = req.params;
    let post;
    let toUpdate = req.body;
    for(let i=0;i<postDB.length;i++){
        if(postDB[i].post_id == post_id){
            post = postDB[i];
        }
    }
    if(post == undefined){
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }
    for(let key in toUpdate){
        user[key] = toUpdate[key];
    }
    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));
    res.status(200).json({
        status: "success",
        "message": "message"
    })
}
function deletePost(req, res){
    let { post_id } = req.params;
    let initialPostL = postDB.length;
    postDB = postDB.filter(function(post){
        return post.post_id != post_id;
    })
    if(initialPostL = postDB.length){
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));
    res.status(200).json({
        status: "success",
        "message": "post deleted"
    })
}

app.listen(3000, function(){
    console.log("Server is listening at port 3000");
})