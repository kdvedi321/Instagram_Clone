let userDB = require("../model/user.json");
let userModel = require("../model/userModel.js");
let userFollowerModel = require("../model/userFollowerModel.js");
async function createUser(req, res){
    try{
        let ndbuser = await userModel.create(req.body);
        // userDB.push(user);
        // false.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
        res.status(201).json({
            success: "successfull",
            user: ndbuser
        })    
    }catch(err){
        res.status(500).json({
            success : "failure",
            "message": err.message
        })
    }
}
async function getUser(req, res){
    try{
        let { user_id } = req.params;
        let user;
        // for(let i=0;i<DB.length;i++){
        //     if(userDB[i].user_id == user_id){
        //         user = userDB[i];
        //     }
        // }
        user = await userModel.getById(user_id);
        if(user==undefined){
            return res.status(404).json({
                status: "failure",
                message: "user not found"
            })
        }
        res.status(200).json({
            status: "success",
            user: user
        })    
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}
async function updateUser(req, res){
    let { user_id } = req.params;
    let updateObj = req.body;
    // let user;
    // let toUpdate = req.body;
    // for(let i=0;i<userDB.length;i++){
    //     if(userDB[i].user_id == user_id){
    //         user = userDB[i];
    //     }
    // }
    // if(user == undefined){
    //     return res.status(404).json({
    //         status: "failure",
    //         message: "user not found"
    //     })
    // }
    // for(let key in toUpdate){
    //     user[key] = toUpdate[key];
    // }
    // fs.writeFileSync(path.join(__dirname,"user.json"), JSON.stringify(userDB));
    // res.status(200).json({
    //     status: "success",
    //     "message": "message"
    // })
    try{
        await userModel.updateById(user_id, updateObj);
        const uUser = await userModel.getById(user_id);
        res.status(200).json({
            status: "success",
            "message": uUser
        })
    }catch(err){
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
}
async function deleteUser(req, res){
    let { user_id } = req.params;
    // let initialUserL = userDB.length;
    // userDB = userDB.filter(function(user){
    //     return user.user_id != user_id;
    // })
    // if(initialUserL == userDB.length){
    //     return res.status(404).json({
    //         status: "failure",
    //         message: "user not found"
    //     })
    // }
    // fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    // res.status(200).json({
    //     status: "success",
    //     "message": "user deleted"
    // })
    try{
        const dUser = await userModel.getById(user_id);
        await userModel.deleteById(user_id);
        res.status(200).json({
            status: "success",
            "message": dUser
        })
    }catch(err){
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
}
async function getAllUser(req, res){
    try{
        let user;
        user = await userModel.getAll();
        if(user.length == 0){
            return res.status(404).json({
                status: "failure",
                message: "user not found"
            })
        }
        res.status(200).json({
            status: "success",
            user: user
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}
async function handleRequest(req, res){
    try{
        let reqobj = req.body;
        let { is_public } = await userModel.getById(reqobj.user_id);
        if(is_public == true){
            reqobj.is_pending = false;
            let mappingObj = await userFollowerModel.createRequest(reqobj);
            return res.status(201).json({
                status: "accepted",
                request: mappingObj,
                "message": "your request has been accepted"
            })
        }
        let mappingObj = await userFollowerModel.createRequest(reqobj);
        return res.status(201).json({
            status: "pending",
            request: mappingObj,
            "message": "your request is pending user will accept it"
        }) 
    }catch(err){
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.getAllUser = getAllUser;
module.exports.handleRequest = handleRequest;