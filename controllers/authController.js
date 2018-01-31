//var express = require('express');
var passwordHash = require('password-hash');
var q = require('q');
var d = q.defer();
var authController = function(userModel){
    function checkDataInputByForm(req){  
            req.checkBody('username', 'Username không được bỏ trống').notEmpty();
            req.checkBody('password', 'Password không được bỏ trống').notEmpty();
            req.checkBody('password', 'Độ dài password tối thiểu 7 ký tự').len(7, 30);
            req.checkBody('user_type_id', 'Loại người dùng không được bỏ trống').notEmpty();
            req.checkBody('user_type_id', 'Loại người dùng phải là 1 con số').isInt();
            req.checkBody('first_name', 'First name không được để trống').notEmpty();
            req.checkBody('last_name', 'Last name không được để trống').notEmpty();
            req.checkBody('phone', 'Phone không được để trống').notEmpty();
            req.checkBody('email', 'Email không được để trống').notEmpty();
            req.checkBody('email', 'Email không hợp lệ').isEmail()
            //req.checkBody('avatar', 'Avatart không được để trống').notEmpty();
            req.assert('repassword', 'Password nhập lại không khớp với password ban đầu').equals(req.body.password);

            return req.validationErrors();
    }
    function taskProcess(dataUser, errorDataInput, model){
        return q.Promise(function(resolve, reject) {
            errors = errorDataInput;
             if(errors == false){
                 errors= [];
             }
             if (dataUser.length  > 0 ){
                 errors.push({
                    "location": "body",
                    "param": "username",
                    "msg": "Username này đã tồn tại, vui lòng nhập 1 username khác",
                    "value": model.username 
                });
             }
             if(errors.length >0){
                reject(errors);
             }
             else{

                 var hashedPassword = passwordHash.generate(model.password );

                 var newuser = {
                     username:  model.username,
                     password: hashedPassword,
                     user_type_id : model.user_type_id,
                     first_name : model.first_name,
                     last_name: model.last_name,
                     phone: model.phone,
                     email: model.email,
                     avatar: model.avatar,
                     active: 1,
                     created_at: new Date(Date.now()).toISOString(), 
                     updated_at:new Date(Date.now()).toISOString(), 
                 }
                     
                  userModel.createUser(newuser).then(data =>{
                        resolve(data);
                  })
                  .catch(err =>{
                    reject('Có lỗi trong quá trình xử lý');
                  })
                }
        })
    }
    var register = function(req,res){   
        // q.all(
        //     [ test2, test1])
        // test1.then(function(){
        //     test2
        // } )
        // test1.then(test2)
       // q.all( [test1, test2])
        var errors= [];
        var model = req.body;
        var inputForm= checkDataInputByForm(req);
        var promiseDateUser = userModel.checkUsernameExists(model.username)

        q.all([promiseDateUser, inputForm])
        .spread(function(dataUser, errorDataInput)
        {
                taskProcess(dataUser, errorDataInput, model)
                .then(newUser =>{
                    res.status(200).json(newUser);
                })
                .catch(err =>{
                    res.status(404).json({errors: err});
                })
        })
        .catch(error => {
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
    }
   
    return {
        register: register
    }
}
module.exports = authController;