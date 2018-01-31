

var commonController = function(commonModel){

    var getListDistrict = function(req,res){
        commonModel.getListDistrict()
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
    }
    var getListAcreage = function(req,res){
        commonModel.getListAcreage()
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
    }
    var getListCity = function(req,res){
        commonModel.getListCity()
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
    }
    var getListPrice = function(req,res){
        commonModel.getListPrice()
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
        })
    }
    return {
        getListDistrict: getListDistrict,
        getListAcreage: getListAcreage,
        getListCity: getListCity,
        getListPrice: getListPrice
    }
}
module.exports = commonController;