var express = require('express');
var router = express.Router();
const db = require('./db/helper')

router.post('/', async function (req, res) {
    let params = req.body
    let dbRes = await db.insert(params, 'category')
    res.status(200).json({ message: '', data: dbRes.insertId, code: 200 })
})

router.put('/', async function (req, res) {
    let field = { id: req.body.id }
    let params = req.body
    delete params.id
    let dbRes = await db.update(field, params, 'category')
    res.status(200).json({ message: '', data: dbRes.affectedRows, code: 200 })
})

router.delete('/', async function (req, res) {
    let dbRes = await db.delete(req.body, 'category')
    res.status(200).json({ message: '', data: dbRes.affectedRows, code: 200 })
})


module.exports = router;
