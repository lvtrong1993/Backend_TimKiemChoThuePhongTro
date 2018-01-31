
var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var q = require('q');
var d = q.defer();

//
 var reportController = function(reportModel){

     var get = function(req,res){
        reportModel.getlistreport()
       .then(function (result) {
            res.status(200).json(result);
        })         .catch(function (error) {
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })

     }
    
 

 
    var createReport = function(req, res)
    {
        var lstErr = [];
        var lstMessErr = [];
        var model = req.body;
        if(!model.user_id)
        {
            lstMessErr.push('userid khong duoc de trong');
        }
        if(!model.posts_id)
        {
            lstMessErr.push('postsid khong duoc de trong');
        }
        if(model.status < 1 || model.status > 5)
        {
            lstMessErr.push('Trang thai khong phu hop');
        }
        if(lstMessErr.length >0){
            res.status(404).json({errors: lstMessErr});
        }
     
        else
        {
            var newReport={
                user_id:model.user_id,
                posts_id:model.posts_id,
                description:model.description,
                status:model.status

            }
            reportModel.createReport(newReport)
            .then(function (result) {
                res.status(200).json("Thêm Report thanh cong");
            })
            .catch(function (error) {
                console.log(error);
                res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
  })

        }

    }
     
   

    return {
        
        get:get,
        createReport: createReport
    }
 }

module.exports = reportController;