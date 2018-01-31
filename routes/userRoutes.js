var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    }
  });

    
var upload = multer({ storage: storage });

var routes = function(userModel, roleModel){
 
   var userRouter = express.Router();
   var userController = require('../controllers/userController')(userModel, roleModel);
   userRouter.route('/')
    .get(userController.get);
   userRouter.route('/GetRoles')
   .get(userController.getRoles);
   userRouter.route('/getListCustomer')
   .get(userController.getListUserByOrder);
   userRouter.route('/customerDetail/:id')
   .get(userController.getCustomerDetail);
   userRouter.route('/getListCustomerByOrder/:idUser/:idPost')
   .get(userController.getListCustomerByOrder);
   userRouter.route('/getCustomerDetailByOrder/:idPost/:idUser')
   .get(userController.getCustomerDetailByOrder);
//    userRouter.route('/xxx')
//    .get(userController.get)

//    userRouter.route('/xxx/:id')
//    .get(function(req, res){
//     var uid =req.params.uid
//     // res.send('Got a POST request'+idd);
//     userController.getCustomerDetail(uid)
//     .then(function (user) {
//         if(user.length == 0){
//           res.status(404).json({lstErr: ['User người dùng không tồn tại']});
//         }else{
//           req.user = user[0];
//           req.user.avatar= req.protocol + '://' + req.get('host') +'/' + req.user.avatar;
//           next();
//         }
//     })
//     .catch(function (error) {
//         res.status(404).json({lstErr: ['Có lỗi trong quá trình xử lý1234']});
//     })
//    });
//    userRouter.route('/xxx')
//    .get(userController.getCustomerDetail);


//    app.route('/xxx')
//    .get(function (req, res) {
//      //res.send('Get a random book')
//     //  var id = (req.params.userID);
//     //  console(id);
//     res.send('Get a random book')
//    })
   //userRouter.route()
//    userRouter.route('/customer/:id')
//    .get(userController.getCustomerDetail(req.params.id));
   
// router.get('/about', function (req, res) {
//     res.send('About birds')
//   })


   //middleware
   userRouter.use('/:userID', function(req, res, next){
      userModel.getUserDetail(req.params.userID)
      .then(function (user) {
          if(user.length == 0){
            res.status(404).json({lstErr: ['User người dùng không tồn tại']});
          }else{
            req.user = user[0];
            //req.user.avatar= req.protocol + '://' + req.get('host') +'/' + req.user.avatar;
            next();
          }
      })
      .catch(function (error) {
          res.status(404).json({lstErr: ['Có lỗi trong quá trình xử lý']});
      })
   });

//    userRouter.use('/customerDetail/:userID', function(req, res, next){
//     userModel.getUserDetailByOrder(req.params.userID)
//     .then(function (user) {
//         if(user.length == 0){
//           res.status(404).json({lstErr: ['User người dùng không tồn tại']});
//         }else{
//           req.user = user[0];
//           req.user.avatar= req.protocol + '://' + req.get('host') +'/' + req.user.avatar;
//           next();
//         }
//     })
//     .catch(function (error) {
//         res.status(404).json({lstErr: ['Có lỗi trong quá trình xử lý123']});
//     })
//  });

   userRouter.route('/:userID')
    .get(userController.getDetail)
    .post(upload.single('avatar'), userController.put)
    .delete(userController.deleteUser);

    // userRouter.route('xxx/userID')
    // .get(userController.getUserDetailByOrder);
    return userRouter;
//   userRouter.route('customer/:id')
//   .get(userController.);
};
module.exports = routes;