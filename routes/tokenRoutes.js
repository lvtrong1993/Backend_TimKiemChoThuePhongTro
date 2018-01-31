var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var routes = function(userModel, roleModel){
   var tokenRouter = express.Router();
   var tokenController = require('../controllers/tokenController')(userModel, roleModel);
   tokenRouter.route('/')
    .post(tokenController.token)
    
    return tokenRouter;
};
module.exports = routes;