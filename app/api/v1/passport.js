const Router = require('koa-router')
const router = new Router()
const { IntegerValidator } = require('../../validator/validator.js')
router.post('/v1/:id/passport', async (ctx, next) => {
  const query = ctx.request.query
  const path = ctx.params
  const v = new IntegerValidator().validate(ctx)
  const id = v.get('path.id')
  console.log(v)
  ctx.body = 'zzzzz'
})

module.exports = router