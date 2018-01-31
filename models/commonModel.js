var mysql = require('mysql'),
q = require('q');
db = require('../fn/mysql-db');

var d = q.defer();

var commonModel= {
    getListDistrict :  function() {
        var  sql = 'select* from district';
        //console.log('list user');
        return db.load(sql);
    },
    getListAcreage :  function() {
        var  sql = 'select* from acreage';
        //console.log('list user');
        return db.load(sql);
    },
    getListCity :  function() {
        var  sql = 'select* from city';
        //console.log('list user');
        return db.load(sql);
    },
    getListPrice :  function() {
        var  sql = 'select* from price';
        //console.log('list user');
        return db.load(sql);
    }
   
/*

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
            
        })*/ 
}
module.exports = commonModel;