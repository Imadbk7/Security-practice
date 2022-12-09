const mysql = require('../helpers/Mysql');


const getAllUsers = () => {
    return new Promise(((resolve, reject) => {
        mysql.mysql.query('select * from users', (error, result) => {
            resolve(result);
        });
    }));
}

const unBlockUser = (id) => {
    return new Promise(((resolve, reject) => {
        mysql.mysql.query('UPDATE `rand_v2`.`users` SET `loginAttempts` = 0 WHERE (`idusers` = ?)', [id], (err, result) => {
            return !err;
        })
    }))
}


const deleteUser = (id) => {
    console.log(id);
   return new Promise((resolve, reject) => {
       mysql.mysql.query('DELETE FROM users WHERE (`idusers` = ?)', [id], (err, res) => {
           console.log(err);
           if (err) resolve("an error occured");
           else resolve('user is deleted');
       })
   })



}
module.exports.unBlockUser = unBlockUser
module.exports.getAllUsers = getAllUsers;
module.exports.deleteUser = deleteUser;
