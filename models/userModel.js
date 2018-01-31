var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();

var userModel= {
    getListUser :  function() {
        var  sql = 'select u.*, t.name as role from user u , user_type t where t.id =  u.user_type_id and u.active = 1';
        //console.log('list user');
        return db.load(sql);
    },
    getUserDetail: function(id){
        var  sql = 'select u.*, t.name as role from user u , user_type t where u.active= 1 and  t.id=  u.user_type_id and  u.id=' + id;
        return db.load(sql);
    },
    getUserByUsername: (username) => {
        var sql = `select * from user where username= '${username}' `;
        return db.load(sql);
    },
    checkUsernameExists : (username) =>{
        var  sql = "select * from user where username='" + username + "'";
        //var result = q.delay(db.load(sql), 6000);
        //console.log('Dang doi deplay: checkUsernameExists');
        return db.load(sql);
    },
    createUser: (user) => {
        var  sql = `insert into user values(null, '${user.username}', '${user.password}',${user.user_type_id}, 
         '${user.first_name}', '${user.last_name}' , '${user.phone}' , '${user.email}', '${user.avatar}',
         ${user.active}, '${user.created_at}' , '${user.updated_at}')`;
       
         return db.load(sql);
    },
    updateUser: (user) => {
        var  sql = `update user set  first_name = 
         '${user.first_name}', last_name=  '${user.last_name}' , phone=  '${user.phone}' ,  email= '${user.email}', 
         updated_at=  '${user.updated_at}' where id=  ${user.id} `;
       
         return db.load(sql);
    },
    updateAvatar: (img, id) => {
        var  sql = `update user set  avatar = '${img}', 
         updated_at=  '${new Date(Date.now()).toISOString()}' where id= ${id}`;
         return db.load(sql);
    },
    deleteUser: (id) => {
        //Ban  user account -->set active= 0
        var  sql = `update user set  active = 0, 
         updated_at=  '${new Date(Date.now()).toISOString()}' where id= ${id}`;
         return db.load(sql);
    },
    
    getListUserByOrder : function(){
        var sql ='SELECT `user`.`id`, `user`.`username`, `user`.`password`, `user`.`user_type_id`, `user`.`first_name`, `user`.`last_name`, `user`.`phone`, `user`.`email`, `user`.`avatar`, `user`.`active` FROM `user`, `order` where `user`.`id` = `order`.`user_id`';
        return db.load(sql);
    }, 
    getUserDetailByOrder: function(id){
        var sql = 'SELECT `user`.`id`, `user`.`username`, `user`.`password`, `user`.`user_type_id`, `user`.`first_name`, `user`.`last_name`, `user`.`phone`, `user`.`email`, `user`.`avatar`, `user`.`active` FROM `user`, `order` where `user`.`id` = `order`.`user_id` and `user`.`id`= ' +id;
        return db.load(sql);
    },
    checkUserExistsById: function(id){
        var sql = 'select * from user where id='+id;
        return db.load(sql);
    },
    getListCustomerByOrder : function(idUser, idPost){
        //var sql ='SELECT `user`.`id`, `user`.`username`, `user`.`password`, `user`.`user_type_id`, `user`.`first_name`, `user`.`last_name`, `user`.`phone`, `user`.`email`, `user`.`avatar`, `user`.`active` FROM `user`, `order` where `user`.`id` = `order`.`user_id`';
        var sql ='SELECT `user`.`id`, `user`.`username`, `user`.`password`, `user`.`user_type_id`, `user`.`first_name`, `user`.`last_name`, `user`.`phone`, `user`.`email`, `user`.`avatar`, `user`.`active` FROM `user`, `order`, `posts` where `user`.`id` = `order`.`user_id` AND `posts`.`user_id`= '+idUser +' AND `posts`.`id`= '+idPost +' AND `order`.`posts_id`= `posts`.`id`';        
        console.log(sql);
        return db.load(sql);
    },
    getCustomerDetailByOrder: function(idUser, idPost, idCustomer){
       // var sql ='SELECT `user`.`id`, `user`.`username`, `user`.`password`, `user`.`user_type_id`, `user`.`first_name`, `user`.`last_name`, `user`.`phone`, `user`.`email`, `user`.`avatar`, `user`.`active`, `order`.`create_at` as `ngay_dat_phong` FROM `user`, `order`, `posts` where `user`.`id` = `order`.`user_id` AND `posts`.`user_id`= '+idUser +' AND `posts`.`id`= '+idPost +' AND `order`.`posts_id`= `posts`.`id` AND `user`.`id` = '+idCustomer;        
      var sql ='SELECT `user`.`id`, `user`.`username`, `user`.`password`, `user`.`user_type_id`, `user`.`first_name`, `user`.`last_name`, `user`.`phone`, `user`.`email`, `user`.`avatar`, `user`.`active`, `order`.`create_at` as `ngay_dat_phong` FROM `user`, `order`, `posts` where `user`.`id` = `order`.`user_id`  AND `posts`.`id`= '+idPost +' AND `order`.`posts_id`= `posts`.`id` AND `user`.`id` = '+idUser;        
 
       console.log(sql);
        return db.load(sql);
    }
 }
module.exports = userModel;