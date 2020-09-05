const db = require("./connection");
const { v4: uuidv4 } = require('uuid');
const create = function(userobj){
    userobj.uid = uuidv4();
    return new Promise(function(resolve, reject){
        db.query('INSERT INTO user SET ?', userobj, function(err, result){
            if(err){
                reject(err);
            }else{
                resolve(userobj);
            }
        })
    })
}
const getById = function (id, selectionobj){

}
const updateById = function (uid, updateObj){

}
const deleteById = function(id){

}
module.exports.create = create;
module.exports.getById = getById;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;