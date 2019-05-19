const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user'
})
const { User } = require('../../models/user')
const { RegisterValidator } = require('../../validator/validator')
router.post('/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.confirmPassword'),
    nickname: v.get('body.nickname')
  }
  await User.create(user)
  throw new global.errors.Success('创建用户成功！')
})

module.exports = router