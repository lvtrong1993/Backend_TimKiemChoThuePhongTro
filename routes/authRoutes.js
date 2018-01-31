var express = require('express');

var routes = function(userModel){
   var authRouter = express.Router();
   var authController = require('../controllers/authController')(userModel);
   authRouter.route('/register')
    .post(authController.register)
    return authRouter;
};
module.exports = routes;