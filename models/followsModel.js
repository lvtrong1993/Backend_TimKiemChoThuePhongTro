var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();
var followModel={
	createfollow:(newfollow)=>{
		var sql='insert into `follows` values(null,'+newfollow.user_id+','+newfollow.posts_id+')';
		return db.load(sql);
	}
}
module.exports=followModel;