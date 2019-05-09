const Router = require('koa-router')
const router = new Router()
router.post('/v1/:id/book/path', (ctx, next) => {
  const body = ctx.request.body
  console.log(body.openid)
  ctx.body = {
    name: 'book'
  }
})

module.exports = router