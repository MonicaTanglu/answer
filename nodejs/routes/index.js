var express = require('express');
var router = express.Router();
const db = require('./db/helper')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/category', async function (req, res) {
//   let params = req.body
//   let dbRes = await db.insert(params, 'category')
//   console.log('dbRes', dbRes)
//   res.sendStatus(200).json({ message: '', data: dbRes.insertId, code: 200 })
// })
module.exports = router;
