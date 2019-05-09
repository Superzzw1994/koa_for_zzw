const Sequelize = require('sequelize')
const { dbName, host, port, user, password} = require('../config/config.js').database
// dbname, user, password, 
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {

  }
})
module.exports = {
  db: sequelize
}