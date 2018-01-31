
var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var q = require('q');
var d = q.defer();

var postsController = function(postsModel){

    var get = function(req,res){
        postsModel.getlistpost()
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (error) {
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })

    }
    
 

    var getDetail = function(req, res){

      var id=req.params.postsid;
      postsModel.getdetailpost(id)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (error) {
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })


    }
    var createposts = function(req, res)
    {
        var lstErr = [];
        var lstMessErr = [];
        var model = req.body;
        if(!model.user_id)
        {
            lstMessErr.push('userid khong duoc de trong');
        }
        if(!model.city_id)
        {
            lstMessErr.push('city_id khong duoc de trong');
        }
        if(!model.district_id)
        {
            lstMessErr.push('district_id khong duoc de trong');
        }
        if(!model.room_type_id)
        {
            lstMessErr.push('room_type_id khong duoc de trong');
        }
        if(lstMessErr.length >0){
            res.status(404).json({errors: lstMessErr});
        }
        else
        {
            var newposts={
                user_id:model.user_id,
                title:model.title,
                description:model.description,
                city_id:model.city_id,
                district_id:model.district_id,
                address:model.address,
                price:model.price,
                acreage:model.acreage,
                create_at:new Date(Date.now()).toISOString(),
                modify_at:new Date(Date.now()).toISOString(),
                longtitude:model.longtitude,
                latitude:model.latitude,
                count_vote:model.count_vote,
                total_vote_value:model.total_vote_value,
                status:model.status,
                room_type_id:model.room_type_id,

            }
            postsModel.createposts(newposts)
            .then(function (result) {
                res.status(200).json("Thêm bai dang thành công");
            })
            .catch(function (error) {
                console.log(error);
                res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
  })

        }

    }
     
    var updatepost =function(req, res)
    {
        var lstErr = [];
        var lstMessErr = [];
        var model = req.body;
        if(!model.id)
        {
            lstMessErr.push('id khong duoc de trong');
        }
        if(!model.user_id)
        {
            lstMessErr.push('userid khong duoc de trong');
        }
        if(!model.city_id)
        {
            lstMessErr.push('city_id khong duoc de trong');
        }
        if(!model.district_id)
        {
            lstMessErr.push('district_id khong duoc de trong');
        }
        if(!model.room_type_id)
        {
            lstMessErr.push('room_type_id khong duoc de trong');
        }
        if(lstMessErr.length >0){
            res.status(404).json({errors: lstMessErr});
        }
        else
        {
            var newposts={
                id:model.id,
                user_id:model.user_id,
                title:model.title,
                description:model.description,
                city_id:model.city_id,
                district_id:model.district_id,
                address:model.address,
                price:model.price,
                acreage:model.acreage,
                create_at:new Date(Date.now()).toISOString(),
                modify_at:new Date(Date.now()).toISOString(),
                longtitude:model.longtitude,
                latitude:model.latitude,
                count_vote:model.count_vote,
                total_vote_value:model.total_vote_value,
                status:model.status,
                room_type_id:model.room_type_id,

            }
            postsModel.updateposts(newposts)
            .then(function (result) {
                res.status(200).json("cap nhat bai  dang thành công");
            })
            .catch(function (error) {
                console.log(error);
                res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
            })
           }
           
    
    }
    var deleteposts=function(req,res)
    {
         var postsid=req.params.postsid;
         postsModel.deleteposts(postsid)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (error) {
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
    }

    /*
    var postController = function(postModel, roleModel){



    var duyetPost = function(req, res){
        var id = req.params.id;
        postModel.duyetPost(id)
        .then((result) => {
            res.send(result, 200);
        })
        .catch((ex) => {
            res.send(ex, 400);
        })
    } */
    var duyetPost = function(req, res){
        var postId = req.params.postId;
        postsModel.duyetPost(postId)
        .then(function (result) {
            if(result.changedRows <1)
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
            else
            res.status(200).json("Duyệt post thành công");
        })
        .catch(function (error) {
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
    }

    var updateStatus =function(req, res)
    {
        var lstErr = [];
        var lstMessErr = [];
        var model = req.body;
        if(!model.postId)
        {
            lstMessErr.push('id1 khong duoc de trong');
        }
        if(model.status<0 || model.status>1)
        {
            lstMessErr.push('status không hợp le');
        }
   
    
    
    
        if(lstMessErr.length >0){
            res.status(404).json({errors: lstMessErr});
        }
        else
        {
            var post={
                postId:model.postId,
                status:model.status
            //    modify_at:new Date(Date.now()).toISOString()

            }
            postsModel.updateStatus(post)
            .then(function (result) {
                res.status(200).json("cap nhat bai  dang thành công");
            })
            .catch(function (error) {
                console.log(error);
                res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
            })
           }
           
    
    }
    return {
        get:get,
        
        getDetail: getDetail,
        createposts:createposts,
        updatepost:updatepost,
        deleteposts:deleteposts,
        duyetPost:duyetPost,
        updateStatus:updateStatus
    }

}
module.exports = postsController;