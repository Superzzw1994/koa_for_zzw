const { HttpException } = require('../core/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
  }  catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if (isDev && !isHttpException) {
      throw error
    }
    if (error instanceof HttpException) {
      ctx.body = {
        message: error.msg,
        requestUrl: `${ctx.method} ${ctx.path}`,
        error_code: error.errorCode
      }
      ctx.status = error.status
    } else {
      ctx.body = {
        message: error.msg,
        requestUrl: `${ctx.method} ${ctx.path}`,
        error_code: error.errorCode
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError