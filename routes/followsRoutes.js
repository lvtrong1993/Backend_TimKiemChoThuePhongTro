var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var routes = function(followsModel){
 
   var userRouter = express.Router();
   var followsController = require('../controllers/followsController')(followsModel);
   userRouter.route('/create')
    .post(followsController.createfollow);
     
   //middleware
   
   

    return userRouter;
  
};
module.exports = routes;