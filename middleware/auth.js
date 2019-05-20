const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
  constructor () {
    
  }

  get m () {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      if (!userToken || !userToken.name) {
        throw new global.errors.Forbbiden('禁止访问')
      }
      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch(error) {
        if (error.name === 'TokenExpiredError') {
          throw new global.errors.Forbbiden('token过期')
        } else {
          throw new global.errors.Forbbiden('token不合法')
        }
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }
}

module.exports = {
  Auth
}