var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();

var postModel= {
    duyetPost : (id)=>{
        var sql ='UPDATE `posts` SET `duyet_bai` = 1  WHERE `posts`.`id` = '+ id;
        // var sql ='UPDATE ';
        //console.log(sql);
        return db.load(sql);
    }
 }
module.exports = postModel;