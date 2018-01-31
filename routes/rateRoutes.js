var express = require('express');

var routes = function(rateModel){
   var rateRouter = express.Router();
   var rateController = require('../controllers/rateController')(rateModel);
   rateRouter.route('/create')
    .post(rateController.createRate)
    return rateRouter;
};
module.exports = routes;