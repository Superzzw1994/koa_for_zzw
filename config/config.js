module.exports = {
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },
  security: {
    secretKey: 'zzwisgenuis',
    expiresIn: 60*60*24*30
  },
  wechat: {
    appId: 'wx5dd17e1b69adc10f',
    appSecret: '9c7672e49aa21a022cff1dcd388cff0b',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}