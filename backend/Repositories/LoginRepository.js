const mysql = require('../helpers/Mysql')
const jwt = require('../helpers/jwt')


const auth = (email, password) => {
    return new Promise(((resolve, reject) => {
        mysql.mysql.query('select * from users where email = ?', [email], (err, result) => {
            if (result.length === 1) {
                if (result[0].loginAttempts >= 5) {
                    resolve('account is blocked');
                }
                mysql.mysql.query('select * from users where email = ? and password = ?', [email, password], (err, result) => {
                    if (err) throw err;
                    if (result.length === 1) {
                        resolve(jwt.authToken(result[0].idusers, result[0].role));
                    } else {
                        mysql.mysql.query('UPDATE `rand_v2`.`users` SET `loginAttempts` = `loginAttempts` +1 WHERE (`email` = ?)', [email], (err, result) => {
                            if (err) throw err;
                        })
                        resolve('null');
                    }
                })
            } else resolve('null');
        });
    }))
}





module.exports.auth = auth;
