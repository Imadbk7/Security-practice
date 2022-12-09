const mysql = require('mysql');


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PW,
    database: 'rand_v2'
});

con.connect(function(err) {
    if (err) throw err;
});

module.exports.mysql = con;
