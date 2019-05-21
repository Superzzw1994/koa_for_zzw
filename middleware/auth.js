const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
  constructor (level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
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
      if (decode.scope < this.level) {
        throw new global.errors.Forbbiden('权限不足')
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }

  static verifyToken (token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch(error) {
      return false
    }
  }
}

module.exports = {
  Auth
}