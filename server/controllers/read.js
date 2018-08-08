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

if (!db) {
  db = knex(configDB);
}

var bookshelf = require('bookshelf')(db);

var cReadMssage = bookshelf.Model.extend({
  tableName: 'cReadMssage'
});

async function post(ctx, next){
  await cReadMssage.where('open_id', ctx.request.body.openId).fetch().then(function (cSessionInfo) {
    ctx.state.data = {
      msg: cSessionInfo.attributes.open_id
    }
  }).catch(function (err) {
    console.error(err);
  });
}

async function get(ctx, next) {

}

module.exports = {
  post,
  get
}