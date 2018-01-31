var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var routes = function(reportModel){
 
   var userRouter = express.Router();
   var reportController = require('../controllers/reportController')(reportModel);

   
    userRouter.route('/create')
    .post(reportController.createReport);
    userRouter.route('/')
    .get(reportController.get);
    
    return userRouter;
  
};
module.exports = routes;