class HttpException extends Error {
  constructor (msg = '服务器异常', errorCode = 10000, status = 400) {
    super()
    this.errorCode = errorCode
    this.status = status
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor (msg= '参数错误', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }

}

class Success extends HttpException {
  constructor(msg= 'Ok', errorCode = '0') {
    super()
    this.msg = msg
    this.status = 201
    this.errorCode = errorCode
  }
}

class NotFound extends HttpException {
  constructor (msg = '资源未找到', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = 404
  }
}
class AuthFailed extends HttpException {
  constructor (msg = '密码错误', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
  }
}

class Forbbiden extends HttpException {
  constructor (msg = '密码错误', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = 403
  }
}
module.exports = { HttpException, ParameterException, Success, NotFound, AuthFailed, Forbbiden }