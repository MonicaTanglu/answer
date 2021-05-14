var express = require('express');
var router = express.Router();
const db = require('./db/helper')

router.post('/', async function (req, res) {
    let params = req.body
    delete params.id
    let dbRes = await db.insert(params, 'question')
    let obj = {
        message: dbRes.message,
        data: dbRes.data.insertId,
        code: dbRes.code
    }
    res.status(200).json(obj)
})

router.put('/', async function (req, res) {
    let field = { id: req.body.id }
    let params = req.body
    delete params.id
    let dbRes = await db.update(field, params, 'question')
    let obj = {
        message: dbRes.message,
        data: dbRes.data.affectedRows,
        code: dbRes.code
    }
    res.status(200).json(obj)
})

router.delete('/', async function (req, res) {
    let dbRes = await db.delete(req.body, 'question')
    let obj = {
        message: dbRes.message,
        data: dbRes.data.affectedRows,
        code: dbRes.code
    }
    res.status(200).json(obj)
})

router.get('/', async function (req, res) {
    // let field = { id: req.body.id }
    // let params = req.body
    // delete params.id

    let dbRes = await db.find(req.query, 'question')
    res.status(200).json(dbRes)
})



module.exports = router;
