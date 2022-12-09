const mysql = require('../helpers/Mysql')

const addUser = (name, email, password) => {
    return new Promise(((resolve, reject) => {
        mysql.mysql.query("insert into users(name, email, password, role, loginAttempts) values(?,?,?, 'user', 0)", [name, email, password],
            (err, result) => {
                if (err) resolve(false);
                else resolve(true);
            })
    }));
}

const checkPw = (password) => {
    return new Promise(((resolve, reject) => {
        mysql.mysql.query('select * from common_pw where password = ?', [password], (err, result) => {
            if (result.length > 0) {
                resolve(true);
            } else resolve(false);
        })
    }))


}

module.exports.adduser = addUser;

module.exports.checkPw = checkPw;
