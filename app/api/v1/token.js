const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/token'
})
const { User } = require('../../models/user.js')
const { LoginType } = require('../../lib/enum.js')
const { TokenValidator } = require('../../validator/validator.js')
const { generateToken } = require('../../../core/util')
router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)
  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
    token = await emailLogin(v.get('body.account'), v.get('body.secret'))
    break
    case LoginType.LOGIN_MINI_PROGRAM:
    break
    default:
    break
  }
  ctx.body = {
    token
  }
})
async function emailLogin(accout, secret) {
  const user = await User.verifyEmailPassword(accout, secret)
  return generateToken(user.id, 2)
}
module.exports = router