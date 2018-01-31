var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var routes = function(orderModel){
 
   var userRouter = express.Router();
   var orderController = require('../controllers/orderController')(orderModel);
   userRouter.route('/create')
    .post(orderController.createorder);
     userRouter.route('/:id')
   .get(orderController.get);
   //middleware
   
   

    return userRouter;
  
};
module.exports = routes;