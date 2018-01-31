var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();

var rateModel= {
    creatRate : function(newRate){
         var  sql = `insert into Ratting values(null, '${newRate.userId}', '${newRate.rating}', '${newRate.description}')`;
         return db.load(sql);
    },
  
    updateScore : function (userId, score){
        var  sql = 'update `user` SET `user`.`scores` = `user`.`scores` + '+score +' where `user`.`id` = '+userId;
        return db.load(sql);
       
    }
    /**
     * mysql_query("
    UPDATE member_profile 
    SET points = points + 1
    WHERE user_id = '".$userid."'
");
     */


    /*   createUser: (user) => {
        var  sql = `insert into user values(null, '${user.username}', '${user.password}',${user.user_type_id}, 
         '${user.first_name}', '${user.last_name}' , '${user.phone}' , '${user.email}', '${user.avatar}',
         ${user.active}, '${user.created_at}' , '${user.updated_at}')`;
       
         return db.load(sql);
    } */
 }
module.exports = rateModel;