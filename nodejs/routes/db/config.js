var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'question'
})

module.exports = {
    query: (sql, cb) => {
        pool.query(sql, function (error, results, field) {
            if (error) cb({ code: 500, message: error.sqlMessage,data: '' })
            cb({ code: 200, data: results,message: '' })
        })
    }
}
// connection.connect()