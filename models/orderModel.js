var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();

var orderModel= {
	getlistorder: function(id) {
		var sql = 'select * FROM `order`  where `order`.`user_id` = '+id ;
		return db.load(sql);
	},
   
    createorder: (neworder) => {
        var  sql = 'insert into `order` values(null,'+neworder.user_id+', '+neworder.posts_id+',null,null)';
       
         return db.load(sql);
    } 
    
 }
module.exports = orderModel;