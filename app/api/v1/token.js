const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/token'
})
const { User } = require('../../models/user.js')
const { LoginType } = require('../../lib/enum.js')
const { TokenValidator, NoEmptyValidator } = require('../../validator/validator.js')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middleware/auth')
const { WechatManager } = require('../../services/wechat')
router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)
  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
    token = await emailLogin(v.get('body.account'), v.get('body.secret'))
    break
    case LoginType.LOGIN_MINI_PROGRAM:
    token = await WechatManager.codeToToken(v.get('body.account'))
    break
    default:
    break
  }
  console.log(token)
  ctx.body = {
    token
  }
})

router.post('/verify', async (ctx, next) => {
  const v = await new NoEmptyValidator().validate(ctx)
  const result = await Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    result
  }
})
async function emailLogin(accout, secret) {
  const user = await User.verifyEmailPassword(accout, secret)
  return generateToken(user.id, Auth.USER)
}
module.exports = router