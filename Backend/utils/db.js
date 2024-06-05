const mysql = require('mysql2')

var pool = mysql.createPool({
    host:'localhost',
    user:"root",
    password:'sqllegasypassword24',
    database:'appoinment_practice'
})
module.exports = pool.promise();