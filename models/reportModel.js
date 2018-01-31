var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();
var postsModel= {
	
	createReport: (newReport)=>{
		var  sql = 'insert into `report` values(null,'+newReport.user_id+', '+newReport.posts_id+','+newReport.description+','+newReport.status+')';
		return db.load(sql);
	},
	getlistreport:function(){
		var sql='select * from `report` ';
		return db.load(sql);
	}


	
	
}
module.exports = postsModel;