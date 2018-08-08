const { getDb, guid } = require('../common/dbHelper')

/**  
* js时间对象的格式化; 
* eg:format="yyyy-MM-dd hh:mm:ss";   
*/
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,  //month   
    "d+": this.getDate(),     //day   
    "h+": this.getHours(),    //hour   
    "m+": this.getMinutes(),  //minute   
    "s+": this.getSeconds(), //second   
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter   
    "S": this.getMilliseconds() //millisecond   
  }
  var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(w+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, week[this.getDay()]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

/** 
*js中更改日期  
* y年， m月， d日， h小时， n分钟，s秒  
*/
Date.prototype.add = function (part, value) {
  value *= 1;
  if (isNaN(value)) {
    value = 0;
  }
  switch (part) {
    case "y":
      this.setFullYear(this.getFullYear() + value);
      break;
    case "m":
      this.setMonth(this.getMonth() + value);
      break;
    case "d":
      this.setDate(this.getDate() + value);
      break;
    case "h":
      this.setHours(this.getHours() + value);
      break;
    case "n":
      this.setMinutes(this.getMinutes() + value);
      break;
    case "s":
      this.setSeconds(this.getSeconds() + value);
      break;
    default:

  }
}  

var bookshelf = require('bookshelf')(getDb());

var cReadMssage = bookshelf.Model.extend({
  tableName: 'cReadMssage'
});

async function get(ctx, next) {
  var today = new Date(); 
  await cReadMssage.where('open_id', ctx.request.query.openId).orderBy('create_time', 'DESC').fetchAll().then(function (value) {
    let resRows = [];

    for (let model of value.models) {
      if(resRows.length>30){
        break;
      }
      resRows.push(model.attributes);
    }
    ctx.state.data = {
      rows: resRows
    }
  }).catch(function (err) {
    console.error(err);
  });
}

async function getdate(ctx, next) {

  await cReadMssage.where('create_date', ctx.request.body.today).orderBy('create_time', 'ASC').fetchAll().then(function (value) {

    let resRows = [];

    for (let model of value.models) {
      resRows.push(model.attributes);
    }
    ctx.state.data = {
      rows: resRows
    }
  }).catch(function (err) {
    console.error(err);
  });
}


async function post(ctx, next) {

  let saveFlag = true;

  await cReadMssage.where({ 'open_id': ctx.request.body.openId, 'create_date': ctx.request.body.createDate }).fetch().then(function (readInfo) {
    if (readInfo) {
      saveFlag = false;
    }
  }).catch(function (err) {
    console.error(err);
  });

  if (saveFlag) {
    //此处执行插入操作
    await new cReadMssage({
      uuid: guid(), open_id: ctx.request.body.openId,
      book_name: ctx.request.body.bookName,
      read_second: ctx.request.body.readSecond,
      create_date: ctx.request.body.createDate,
      baby_name: ctx.request.body.babyName
    })
      .save(null, { method: 'insert' })
      .then(function (model) {
        ctx.state.data = {
          message: '保存成功！'
        }
      }).catch(function (err) {
        ctx.state.data = { message: 'error', data: JSON.stringify(err) };
      });
  } else {
    //此处执行更新操作
    await cReadMssage.where({ 'open_id': ctx.request.body.openId, 'create_date': ctx.request.body.createDate })
      .save({
        book_name: ctx.request.body.bookName,
        read_second: ctx.request.body.readSecond,
        create_date: ctx.request.body.createDate,
        baby_name: ctx.request.body.babyName
      }, { method: 'update', patch: true }).then(function (updateMsg) {
        ctx.state.data = {
          message: '保存成功！'
        }
      }).catch(function (err) {
        ctx.state.data = { message: 'error', data: JSON.stringify(err) };
      });
  }

}


module.exports = {
  post,
  get,
  getdate
}