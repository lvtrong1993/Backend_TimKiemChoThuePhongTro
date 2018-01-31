var express = require('express');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

var tokenController = function(userModel, roleModel){

    var token = function(req,res){
        userModel.getUserByUsername(req.body.username)
        .then(function (user) {
            if(user.length == 0){
                res.status(404).json({lstErr: ['Username đăng nhập không tồn tại']});
            }else{
                var check = passwordHash.verify(req.body.password, user[0].password);
                if(!check){
                    res.status(404).json({lstErr: ['Password đăng nhập sai']});              
                    return;
                }
                var data = {};
                data.username = req.body.username;
                jwt.sign(data, 'khintmam', {expiresIn: "2 days", algorithm: 'HS256'}, function(err, token){
                    if (err)
                    {
                        res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
                    }
                    else {
                        res.status(200).json({token: token ,username:  data.username});
                    } 
                });
            }
            
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
    }

    return {
        token: token
    }
}
module.exports = tokenController;