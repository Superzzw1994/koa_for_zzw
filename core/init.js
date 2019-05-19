const Router = require('koa-router')
const requireDirectory = require('require-directory')
class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouters(app)
    InitManager.loadHttpException()
    InitManager.loadConfig()
  }
  static initLoadRouters (app) {
    function loadModule(modules) {
      if (modules instanceof Router) {
        app.use(modules.routes())
      }
    }
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {visit: loadModule})
  }
  static loadHttpException () {
    const errors = require('../core/http-exception')
    global.errors = errors
  }
  static loadConfig (path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
}
module.exports = InitManager