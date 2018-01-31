var express = require('express');

var routes = function(commonModel){
   var authRouter = express.Router();
   var authController = require('../controllers/commonController')(commonModel);
   authRouter.route('/districts')
    .get(authController.getListDistrict)

    authRouter.route('/acreage')
    .get(authController.getListAcreage)
    authRouter.route('/cities')
    .get(authController.getListCity)
    authRouter.route('/prices')
    .get(authController.getListPrice)
    return authRouter;
};
module.exports = routes;