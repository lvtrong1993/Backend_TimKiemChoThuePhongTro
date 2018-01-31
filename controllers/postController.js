// var cloudinary = require('cloudinary'),
//     async = require('async');

// cloudinary.config({
// 	cloud_name: 'dxnapa5zf',
// 	api_key: '219348637198157',
// 	api_secret: 'FJl9rCE5dTS_kgkX_rPvUyMTwZY'
// });
var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var q = require('q');
var d = q.defer();

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/')
//     },
//     filename: function (req, file, cb) {
//       crypto.pseudoRandomBytes(16, function (err, raw) {
//         cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
//       });
//     }
//   });
  
  
// var upload = multer({ storage: storage });

var postController = function(postModel, roleModel){



    var duyetPost = function(req, res){
        var id = req.params.id;
        postModel.duyetPost(id)
        .then((result) => {
            res.send(result, 200);
        })
        .catch((ex) => {
            res.send(ex, 400);
        })
    }



 

    //  var put = function(req, res){
    //     //upload avatar for user
    //     upload.single("img")(req, res, function (err) {
    //         if (err) {
    //           // An error occurred when uploading
    //           console.log('Error uploading file.');
    //           res.status(200).json('Error uploading file.');
    //           return
    //         }else{
    //             console.log('File is uploaded');
    //            res.status(200).json('File is uploaded');
    //         }
    //     });

    // }

//    var deleteUser = function(req, res){

//     }
   
    return {
     //   get:get,
      //  getRoles: getRoles,
        // getDetail: getDetail,
        duyetPost: duyetPost
       
    }
}
module.exports = postController;