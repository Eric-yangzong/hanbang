var knex = require('knex'), db;    // 数据库连接
const { mysql: config } = require('../config')

var configDB = {
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.db,
    charset: config.char,
    multipleStatements: true
  },
  pool: { min: 0, max: 7 }
}


function getDb() {
  if (!db) {
    db = knex(configDB);
  }
  return db;
};

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = { getDb, db, guid };




