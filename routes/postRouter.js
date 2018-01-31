var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var routes = function(postModel, roleModel){
 
   var postRouter = express.Router();
   var postController = require('../controllers/postController')(postModel, roleModel);
   postRouter.route('/duyetPost/:id')
    .put(postController.duyetPost);
//     postRouter.route('/GetRoles')
//    .get(userController.getRoles);
//    postRouter.route('/getListCustomer')
//    .get(userController.getListUserByOrder);
//    postRouter.route('/customerDetail/:id')
//    .get(userController.getCustomerDetail);


   //middleware
//    postRouter.use('/:userID', function(req, res, next){
//       userModel.getUserDetail(req.params.userID)
//       .then(function (user) {
//           if(user.length == 0){
//             res.status(404).json({lstErr: ['User người dùng không tồn tại']});
//           }else{
//             req.user = user[0];
//             req.user.avatar= req.protocol + '://' + req.get('host') +'/' + req.user.avatar;
//             next();
//           }
//       })
//       .catch(function (error) {
//           res.status(404).json({lstErr: ['Có lỗi trong quá trình xử lý']});
//       })
//    });


// postRouter.route('/:userID')
//     .get(userController.getDetail)
//     .put(userController.put)
//     .delete(userController.deleteUser);

    // userRouter.route('xxx/userID')
    // .get(userController.getUserDetailByOrder);
    return postRouter;
//   userRouter.route('customer/:id')
//   .get(userController.);
};
module.exports = routes;