var cloudinary = require('cloudinary');
//     async = require('async');

cloudinary.config({
	cloud_name: 'dxnapa5zf',
	api_key: '219348637198157',
	api_secret: 'FJl9rCE5dTS_kgkX_rPvUyMTwZY'
});

var q = require('q');
var d = q.defer();



var rateController = function(rateModel, roleModel){

   

    

   


     var createRate = function(req, res){
        var model = req.body;
        req.checkBody('userId', 'user name không được để trống').notEmpty();
        req.checkBody('description', 'Last name không được để trống').notEmpty();
        req.checkBody('ratting', 'Ratting không được để trống').notEmpty();
       
        var errors = req.validationErrors();
        

        if(errors.length >0){
            res.status(404).json({errors: errors});
        }else{
            


            var newRate = {
                
                description : model.description,
                ratting: model.ratting,
                userId:model.userId
            }
           /* switch (newRate.scourse) {
                case 0:
                scorse = -2;
                    break;
                case 1:
                scorse = -1;
                    break;
                case 2:
                scorse = 0;
                    break;
                case 3:
                scorse = 1;
                    break;
                case 4:
                scorse = 2;
            }
                  */ 





        //     rateModel.creatRate(newRate)
        //     .then(rs=>rateModel.updateScore(newRate.userId,   model.rating))
        //     .then(   res.status(200))
          
        //     .catch(function (error) {
        //         console.log(error);
        //         res.status(404).json({errors: ['Không thể thêm rating']});
                
        //     }
        // )
        q.all(  rateModel.creatRate(newRate),  rateModel.updateScore(newRate.userId, model.ratting))
        .then( data =>{
            res.status(200).json("RAte thành công");
        })
        .catch(errors =>{
                res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
         
    }

}
    return {
        createRate: createRate
    }

}
module.exports = rateController;