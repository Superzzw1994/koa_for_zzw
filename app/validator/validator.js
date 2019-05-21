const {LinValidator, Rule} = require('../../core/lin-validator-v2')
const { User } = require('../models/user.js')
const { LoginType } = require('../lib/enum.js')
class IntegerValidator extends LinValidator {
  constructor () {
    super()
    this.id = [ 
      new Rule('isInt', '需要是正整数', {min: 1}),
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor () {
    super()
    this.email = [
      new Rule('isEmail', '不符合email规范')
    ]
    this.password = [
      new Rule('isLength', '密码至少6个字符， 最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.confirmPassword = this.password
    this.nickname = [
      new Rule('isLength', '用户名长度为8到24个字符', {
        min: 8,
        max: 24
      })
    ]
  }

  validatePassword(vals) {
    const password = vals.body.password
    const confirmPassword = vals.body.confirmPassword
    if (password !== confirmPassword) {
      throw new Error('两次密码必须相同！')
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new Error('email已存在！')
    }
  }
}

class TokenValidator extends LinValidator {
  constructor () {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
      })
    ]
  }

  validateLoginType (vals) {
    if (!vals.body.type) {
      throw new Error('type是必须参数！')
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法！')
    }
  }
}

class NoEmptyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', '不允许为空', {
        min: 1
      })
    ]
  }
}
module.exports = { IntegerValidator, RegisterValidator, TokenValidator, NoEmptyValidator }