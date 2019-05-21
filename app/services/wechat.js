const util = require('util')
const axios = require('axios')
const { User } = require('../models/user.js')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middleware/auth')
class WechatManager {
  static async codeToToken(code) {
    const url = util.format(global.config.wechat.loginUrl, global.config.wechat.appId, global.config.wechat.appSecret, code)
    console.log(url)
    const result= await axios.get(url)
    if (result.status !== 200) {
      throw new global.errors.AuthFailed('openid获取失败')
    }
    if (result.data.errcode === 0) {
      throw new global.errors.AuthFailed('openid获取失败' + result.data.errcode)
    }
    console.log(User)
    let user = await User.getUserByOpenId(result.data.openid)
    if (!user) {
      user = await User.registerByOpenId(result.data.openid)
    } else {
      throw new global.errors.NotFound('用户已存在！')
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WechatManager
}