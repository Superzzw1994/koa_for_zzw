const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new global.errors.NotFound('用户不存在！')
    } 
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errors.AuthFailed('密码错误，登录失败！')
    }
    return user
  }
  static async getUserByOpenId(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }
  static async registerByOpenId(openid) {
    const user = await User.create({
      where: {
        openid
      }
    })
    return user
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type:  Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  gender: Sequelize.INTEGER,
  text: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}