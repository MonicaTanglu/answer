var express = require('express');
var router = express.Router();
const db = require('./db/helper')
const captcha = require('svg-captcha')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/sys/captcha', function (req, res, next) {
  const cap = captcha.create()
  req.session.captcha = cap.text
  res.type('svg')
  res.send(cap.data)
})
// 登录
router.post('/sys/login', function (req, res, next) {
  if (req.body.captcha !== req.session.captcha) {
    res.status(200).json({ code: 403, message: '验证码不正确', data: '' })
  } else if (req.body.username === 'admin' && req.body.password === '123456') {
    // 这里的token 随便写的 实际使用中需要加密
    res.status(200).json({ code: 200, message: '', data: { token: 'sbxd', userInfo: { username: 'admin' } } })
  } else {
    res.status(200).json({ code: 403, message: '用户名或密码不正确', data: '' })
  }
})

// router.post('/category', async function (req, res) {
//   let params = req.body
//   let dbRes = await db.insert(params, 'category')
//   console.log('dbRes', dbRes)
//   res.sendStatus(200).json({ message: '', data: dbRes.insertId, code: 200 })
// })
module.exports = router;
