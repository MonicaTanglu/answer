const db = require('./config.js')

module.exports = {

    insert: (obj, table) => {
        let fieldStr = '', valueStr = ''
        let fieldArr = []
        let valueArr = []
        for (let key in obj) {
            fieldArr.push('`' + key + '`')
            let v = obj[key]
            if (typeof obj[key] === 'string') v = "'" + v + "'"
            valueArr.push(v)
        }
        fieldStr = fieldArr.join(',')
        valueStr = valueArr.join(',')
        let sql = `insert into ${table} (${fieldStr}) values (${valueStr})`
        return new Promise((resolve, reject) => {
            db.query(sql, (res) => {
                resolve(res)
            })
        })
    },
    update: (field, value, table) => {
        let fieldArr = []
        let valueArr = []
        for (let key in field) {
            let v = field[key]
            if (typeof field[key] === 'string') v = "'" + v + "'"
            fieldArr.push('`' + key + '`=' + v)
        }
        for (let key in value) {
            let v = value[key]
            if (typeof value[key] === 'string') v = "'" + v + "'"
            valueArr.push('`' + key + '`=' + v)
        }
        let fieldStr = fieldArr.join(',')
        let valueStr = valueArr.join(',')

        let sql = `update ${table} set ${valueStr} where ${fieldStr}`
        return new Promise((resolve, reject) => {
            db.query(sql, res => {
                resolve(res)
            })
        })
    },
    delete: (field, table) => {
        let fieldArr = []
        for (let key in field) {
            let v = field[key]
            if (typeof field[key] === 'string') v = "'" + v + "'"
            fieldArr.push('`' + key + '`=' + v)
        }
        let fieldStr = fieldArr.join(',')
        let sql = `delete from ${table} where ${fieldStr}`
        return new Promise((resolve, reject) => {
            db.query(sql, res => {
                resolve(res)
            })
        })
    },
    find: (page, table) => {
        let startIndex = (page.pageNow - 1) * page.pageSize
        let sql = `select * from ${table} limit ${startIndex},${page.pageSize}`
        let sqlCount = `select count(1) from ${table}`
        return new Promise((resolve, reject) => {
            db.query(sql, res => {
                db.query(sqlCount, countRes => {
                    let data = { data: { list: res.data, total: countRes.data[0]['count(1)'], pageNow: page.pageNow }, code: res.code }
                    resolve(data)
                })
                // resolve(res)
            })
        })
    },
    findAll: (table) => {
        let sql = `select * from ${table}`
        return new Promise((resolve, reject) => {
            db.query(sql, res => {
                resolve(res)
            })
        })
    },
    findOne: (table, id) => {
        let sql = `select * from ${table} where id=${id}`
        return new Promise((resolve, reject) => {
            db.query(sql, res => {
                resolve(res)
            })
        })
    },
    custom: (sql) => {
        return new Promise((resolve, reject) => {
            db.query(sql, res => {
                resolve(res)
            })
        })
    }
}