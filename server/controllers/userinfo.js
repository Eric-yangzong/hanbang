const { getDb, guid } = require('../common/dbHelper')

var bookshelf = require('bookshelf')(getDb());

var cUserinfo = bookshelf.Model.extend({
    tableName: 'cUserinfo'
});

async function get(ctx, next) {

  await cUserinfo.where('open_id', JSON.parse(ctx.query.userInfo).openId).fetch().then(function (contentInfo) {
        ctx.state.data = {
            babyName: contentInfo.attributes.baby_name
        }
    }).catch(function (err) {
        console.error(err);
    });
}


async function post(ctx, next) {

    let saveFlag = true;

    await cUserinfo.where('open_id', ctx.request.body.openId).fetch().then(function (userInfo) {
      if (userInfo){
        saveFlag = false;
      }
    }).catch(function (err) {
        console.error(err);
    });

    if (saveFlag) {
        //此处执行插入操作
        await new cUserinfo({ uuid: guid(), open_id: ctx.request.body.openId, baby_name: ctx.request.body.babyName })
            .save(null, { method: 'insert' })
            .then(function (model) {
                ctx.state.data = {
                    babyName: ctx.request.body.babyName
                }
            }).catch(function (err) {
                ctx.state.data = { message: 'error', data: JSON.stringify(err) };
            });
    } else {
        //此处执行更新操作
        await cUserinfo.where('open_id', ctx.request.body.openId)
            .save({
                baby_name: ctx.request.body.babyName
            }, { method: 'update', patch: true }).then(function (updateMsg) {
                ctx.state.data = {
                    babyName: ctx.request.body.babyName
                }
            }).catch(function (err) {
                ctx.state.data = { message: 'error', data: JSON.stringify(err) };
            });
    }

}

module.exports = {
    post,
    get
}
