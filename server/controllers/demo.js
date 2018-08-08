const { getDb } = require('../common/dbHelper')

var bookshelf = require('bookshelf')(getDb());

var cSessionInfo = bookshelf.Model.extend({
  tableName: 'cSessionInfo'
});

async function get(ctx, next) {

  await cSessionInfo.where('open_id', 'oaOUD5okYrHN9r8m6YYj7yELLop8').fetch().then(function (cSessionInfo) {
    ctx.state.data = {
      msg: cSessionInfo.attributes.open_id
    }
  }).catch(function (err) {
    console.error(err);
  });
}


async function post(ctx, next) {

  await cSessionInfo.where('open_id', 'oaOUD5okYrHN9r8m6YYj7yELLop8').fetch().then(function (cSessionInfo) {
    ctx.state.data = {
      msg: cSessionInfo.attributes.open_id
    }
  }).catch(function (err) {
    console.error(err);
  });

  await cSessionInfo.where('open_id',ctx.request.body.openId)
    .save({
      user_info: JSON.stringify(ctx.request.body)
    }, { method: 'update', patch: true }).then(function (updateMsg) {
      ctx.state.data = {
        userinfo: JSON.parse(updateMsg.attributes.user_info)
      }
    }).catch(function (err) {
      ctx.state.data = { message: 'error', data: JSON.stringify(err) };
    });

}

module.exports = {
  post,
  get
}
