var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var routes = function(postsModel){
 
   var userRouter = express.Router();
   var postsController = require('../controllers/postsController')(postsModel);
   userRouter.route('/')
    .get(postsController.get);
   //middleware
   userRouter.route('/:postsid')
    .get(postsController.getDetail)
    //userRouter.route('/update')
   // .put(postsController.updatepost);
    userRouter.route('/create')
    .post(postsController.createposts);
     userRouter.route('/delete/:postsid')
    .put(postsController.deleteposts);
    userRouter.route('/duyetPost/:postId')
    .put(postsController.duyetPost);
    userRouter.route('/updateStatus')
    .put(postsController.updateStatus);
    return userRouter;
  
};
module.exports = routes;