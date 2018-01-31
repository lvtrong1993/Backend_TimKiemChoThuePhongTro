var cloudinary = require('cloudinary');
//     async = require('async');

cloudinary.config({
	cloud_name: 'dxnapa5zf',
	api_key: '219348637198157',
	api_secret: 'FJl9rCE5dTS_kgkX_rPvUyMTwZY'
});

var q = require('q');
var d = q.defer();



var userController = function(userModel, roleModel){

    var get = function(req,res){
        userModel.getListUser()
        .then(function (result) {
            
        //    var promises = result.map(function(element) {
        //         element.avatar = req.protocol + '://' + req.get('host') +'/' + element.avatar;
        //         return q(element);
        //    })
           
        //    q.all(promises).then(data =>{
        //      res.status(200).json(data);
        //    });
             res.status(200).json(result);
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
            
        })

    }
    
    var getRoles = function(req, res){
        // Role.find({})
        //     .select({'_id': 1, 'name': 1, 'name_desc': 1})
        //     .exec(function(err, roles){
        //         if (err){
        //             res.status(404).json({lstErr: ['Có lỗi trong quá trình xử lý']});
        //         }
        //         else res.json(roles);
        //     });
    }

    var getListUserByOrder = function(req, res){
        userModel.getListUserByOrder()
        .then(function (result) {
            
           var promises = result.map(function(element) {
               element.avatar = req.protocol + '://' + req.get('host') +'/' + element.avatar;
                return q(element);
           })

           q.all(promises).then(data =>{
             res.status(200).json(data);
           });
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Không tìm thấy danh sách khách đặt phòng']});
            
        })
    }

    var getCustomerDetail =function(req, res){
        var id = req.params.id;
        userModel.getUserDetailByOrder(id)
        .then(function (result) {
            
           var promises = result.map(function(element) {
             //  element.avatar = req.protocol + '://' + req.get('host') +'/' + element.avatar;
            // console.log('xxx');
                return q(element);
           })

           q.all(promises).then(data =>{
             res.status(200).json(data);
           });
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Không tìm thấy thông tin khách hàng theo yêu cầu']});
            
        })
    }

    var getListCustomerByOrder = function(req, res){
        var idUser = req.params.idUser;
        var idPost =req.params.idPost;
        userModel.getListCustomerByOrder(idUser, idPost)
        .then(function (result) {
            
           var promises = result.map(function(element) {
               element.avatar = req.protocol + '://' + req.get('host') +'/' + element.avatar;
                return q(element);
           })

           q.all(promises).then(data =>{
             res.status(200).json(data);
           });
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý12344']});
            
        })
    }
    var getCustomerDetailByOrder =function(req, res){
        var idUser = req.params.idUser;
        var idPost =req.params.idPost;
        var idCustomer = req.params.idCustomer;
        userModel.getCustomerDetailByOrder(idUser, idPost, idCustomer)
        .then(function (result) {
            
           var promises = result.map(function(element) {
             //  element.avatar = req.protocol + '://' + req.get('host') +'/' + element.avatar;
            // console.log('xxx');
                return q(element);
           })

           q.all(promises).then(data =>{
             res.status(200).json(data);
           });
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý get customer detail']});
            
        })
    }
    var getDetail = function(req, res){
        if (!req.user){
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        }
        else res.status(200).json(req.user);
    }

     var put = function(req, res){
        //upload avatar for user
        // upload.single("img")(req, res, function (err) {
        //     if (err) {
        //       // An error occurred when uploading
        //       console.log('Error uploading file.');
        //       res.status(200).json('Error uploading file.');
        //       return
        //     }else{
        //         console.log('File is uploaded');
        //        res.status(200).json('File is uploaded');
        //     }
        // });
        var model = req.body;
        req.checkBody('first_name', 'First name không được để trống').notEmpty();
        req.checkBody('last_name', 'Last name không được để trống').notEmpty();
        req.checkBody('phone', 'Phone không được để trống').notEmpty();
        req.checkBody('email', 'Email không được để trống').notEmpty();
        req.checkBody('email', 'Email không hợp lệ').isEmail()
        var errors = req.validationErrors();

        if(errors.length >0){
            res.status(404).json({errors: errors});
        }else{
            var user = {
                id: req.user.id,
                first_name : model.first_name,
                last_name: model.last_name,
                phone: model.phone,
                email: model.email,
                updated_at:new Date(Date.now()).toISOString(), 
            }
            if (req.file){
                cloudinary.uploader.upload(req.file.path, function(result){
                   var img = result.url;
                    q.all(  userModel.updateAvatar(img, req.user.id),  userModel.updateUser(user))
                    .then( data =>{
                        res.status(200).json(data);
                    })
                    .catch(errors =>{
                            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
                    })
          
                    }
                )

            }else{
                userModel.updateUser(user).then(data =>{
                    res.status(200).json(data);
                })
                .catch(err =>{
                    res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
                })
            }

         }
    }

   var deleteUser = function(req, res){
        
        userModel.deleteUser(req.user.id)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (error) {
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
    }
   
    return {
        get:get,
        getRoles: getRoles,
        getDetail: getDetail,
        put: put,
        deleteUser: deleteUser,
        getListUserByOrder: getListUserByOrder,
        getCustomerDetail: getCustomerDetail,
        getListCustomerByOrder:getListCustomerByOrder,
        getCustomerDetailByOrder:getCustomerDetailByOrder
    }
}
module.exports = userController;