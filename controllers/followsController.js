var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var q = require('q');
var d = q.defer();
var followsController = function(followsModel){

	var createfollow=function(req,res)
	{
		  var model = req.body;
        req.checkBody('userid', 'userid không được để trống').notEmpty();
        req.checkBody('postsid', 'postsid không được để trống').notEmpty();
         var errors = req.validationErrors();

        if(errors.length >0)
        {
            res.status(404).json({errors: errors});
        }
        else
        {
        	var newfollow = {
              
                user_id : model.userid,
                posts_id: model.postsid,
                
            }
             followsModel.createfollow(newfollow).then(data =>{
                    res.status(200).json(data);
                })
                .catch(err =>{
                    res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
                })
        }
      	
	}
     
    return {
        createfollow:createfollow
    }
   
}
module.exports = followsController;