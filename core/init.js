const Router = require('koa-router')
const requireDirectory = require('require-directory')
class InitManager {
  static initCore (app) {
    InitManager.initLoadRouters(app)
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
}
module.exports = InitManager