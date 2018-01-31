var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();
var postsModel= {
	getlistpost: function(){
			var sql='SELECT `image`.`url`,`posts`.`title`,`posts`.`price`, `user`.`username` from `posts`,`image`,`user` where `posts`.`user_id` = `user`.`id` and `image`.`post_id`= `posts`.`id` and `posts`.`status` =0';
			return db.load(sql);
	},
	getdetailpost: function(id){
		var sql= 'select `image`.`url`,`posts`.`title`,`city`.`name`,`district`.`name`,`posts`.`acreage`,`posts`.`address`,`posts`.`price`,`posts`.`description`,`posts`.`longtitude`,`posts`.`latitude`,`posts`.`count_vote`,`posts`.`total_vote_value`,`posts`.`status` from `posts`,`city`,`district`,`image` where `posts`.`city_id` =`city`.`id` and `posts`.`district_id`= `district`.`id`	and  `posts`.`id`=`image`.`post_id` and `posts`.`id`='+id;
		return db.load(sql);
	},
	createposts: (newposts)=>{
		var  sql = 'insert into `posts` values(null,'+newposts.user_id+', '+newposts.title+','+newposts.description+','+newposts.city_id+','+
		''+newposts.district_id+','+newposts.address+','+newposts.price+','+newposts.acreage+',null,null,'+newposts.longtitude+','+
		''+newposts.latitude+','+newposts.count_vote+','+newposts.total_vote_value+','+newposts.status+'`,'+newposts.room_type_id+')';
		return db.load(sql);
	},

	updateposts: (newposts)=>{
		var  sql = 'update `posts` set  `posts`.`title`='+newposts.title+',`posts`.`description`='+newposts.description+',`posts`.`city_id`='+newposts.city_id+','+
		'`posts`.`district_id`='+newposts.district_id+',`posts`.`address`=`'+newposts.address+'`,`posts`.`price`='+newposts.price+',`posts`.`acreage`='+newposts.acreage+',`posts`.`longtitude`='+newposts.longtitude+','+
		'`posts`.`latitude`='+newposts.latitude+',`posts`.`count_vote`='+newposts.count_vote+',`posts`.`total_vote_value`='+newposts.total_vote_value+',`posts`.`status`='+newposts.status+',`posts`.`room_type_id`='+newposts.room_type_id+''+
		'where `posts`.`id`='+newposts.id+'';
		return db.load(sql);
	},
	deleteposts:(postsid)=>{
		var sql='UPDATE `order`,`posts` SET `posts`.`status`= 0 and `order`.`status`=0 WHERE `posts`.`id`='+postsid+' and `order`.`posts_id`=`posts`.`id`';
		return db.load(sql);
	},
	duyetPost : (postId)=>{
        var sql ='UPDATE `posts` SET `duyet_bai` = 1  WHERE `posts`.`id` = '+postId;
        // var sql ='UPDATE ';
        //console.log(sql);
        return db.load(sql);
	},
	updateStatus:(post)=>{
		var sql='UPDATE `posts` SET `posts`.`status`= ' +post.status+ ' WHERE `posts`.`id`='+post.postId;
		return db.load(sql);
	}
	
	
}
module.exports = postsModel;