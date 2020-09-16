let { v4: uuidv4} = require("uuid");
let db = require("./connection");
module.exports.createEntityFact = function(entity){
    return function(entityObj){
        entityObj.uid = uuidv4();
        return new Promise(function(resolve, reject){
            db.query(`INSERT INTO ${entity} SET ?`, entityObj, function(err, result){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(entityObj);
                }
            });
        })
    }    
}