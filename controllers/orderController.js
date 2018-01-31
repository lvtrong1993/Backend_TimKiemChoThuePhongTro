
var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var q = require('q');
var d = q.defer();


var orderController = function(orderModel){

      var get=function(req,res)
      {
         var id=req.params.id;
        orderModel.getlistorder(id)
         .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (error) {
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })

      }
     var createorder = function(req, res){

        var lstErr = [];
        var lstMessErr = [];
        var model = req.body;

        if (!model.user_id )
        {
            lstMessErr.push('userid khong duoc de trong');
            
        }
        if(!model.posts_id)
        {
          lstMessErr.push('post_id khong duoc de trong');
        }
        if(lstMessErr.length >0){
            
            res.status(404).json({errors:lstMessErr});
        }
       else
       {
          var neworder = {
                        user_id:  model.user_id,
                        posts_id: model.posts_id,
                        created_at: new Date(Date.now()).toISOString(),
                        updated_at:new Date(Date.now()).toISOString(),
                     
            }
            orderModel.createorder(neworder)
            .then(function (result) {
                        res.status(200).json("Thêm người dùng thành công");
                    })
            .catch(function (error) {
                        console.log(error);
                        res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
          })
       }
      
    }
    return {
        get:get,
        createorder:createorder
    }
   
}
module.exports = orderController;