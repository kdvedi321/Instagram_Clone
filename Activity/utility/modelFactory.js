let { v4: uuidv4} = require("uuid");
let db = require("./connection");
module.exports.createEntityFact = function(entity){
    return function(entityObj){
        entityObj.id = uuidv4();
        if(entity == "post"){
            let date = new Date();
            entityObj.created_at = date.toISOString().slice(0,19).replace('T',' ');
        }
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