const mysql = require('../helpers/Mysql');


const findUser = (id) => {
    return new Promise(((resolve, reject) => {
        mysql.mysql.query('select idusers, name, email, role from users where idusers = ?', [id], (err, result) => {
            resolve(result[0]);
        })
    }))
}

module.exports.findUser = findUser;
