const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/passport'
})
const { IntegerValidator } = require('../../validator/validator.js')
const { Auth } = require('../../../middleware/auth')
router.get('/latest', new Auth().m, async (ctx, next) => {
})

module.exports = router