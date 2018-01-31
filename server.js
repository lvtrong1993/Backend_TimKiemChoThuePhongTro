var express = require('express');
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator()); // Add this after the bodyParser middlewares!

//port 
var port = process.env.PORT || 5000;

//For model
var roleModel = require('./models/roleModel');
var userModel = require('./models/userModel');
var postsModel =  require('./models/postsModel');
var orderModel=require('./models/orderModel');
var followsModel=require('./models/followsModel');
var commonModel=require('./models/commonModel');
var reportModel =require('./models/reportModel');
var rateModel =require('./models/rateModel');
//For router
var userRouter = require('./routes/userRoutes')(userModel, roleModel);
var tokenRouter = require('./routes/tokenRoutes')(userModel, roleModel)
var authRouter = require('./routes/authRoutes')(userModel);
var postsRouter=require('./routes/postsRoutes')(postsModel);
var orderRouter=require('./routes/orderRoutes')(orderModel);
var followsRoutes=require('./routes/followsRoutes')(followsModel);
var commonRouter=require('./routes/commonRoutes')(commonModel);
var reportRouter=require('./routes/reportRoutes')(reportModel);
var rateRouter =require('./routes/rateRoutes')(rateModel);
//Middleware collects info from the token

app.use('/api', function(req, res, next){
  var auth = req.headers["authorization"];
  if (auth)
  {
      var token = auth.split(' ')[1];

      jwt.verify(token, 'khintmam', {algorithm: 'HS256'}, function(err, verified){
		    if (err){
              //of V
              //req.auth = undefined;
              //next();
              //end of V
              //of C
              return res.status(404).json("Failed to authenticate token");  
          }
          else
          {

            //Xac dinh lai authorixation lai cho nay. cach flow for authorization
              //userModel.getUserDetail( req.auth.username)
              userModel.getUserDetail(49)
              .then(function (user) {
                  if(user.length == 0){
                    res.status(404).json({lstErr: ['User name cung cấp không tồn tại']});
                  }else{
                    req.auth = user;
                    next();
                  }
              })
              .catch(function (error) {
                  res.status(404).json({lstErr: ['Có lỗi trong quá trình xử lý']});
              })

          }
	  });
          
          
  }
  
  else {
      //req.auth = undefined;
      next();
      //for test api
      //true: 
      //return res.status(403).send("No token provided");
  }
  
});

//For api

app.use('/token', tokenRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts',postsRouter);
app.use('/api/order',orderRouter);
app.use('/api/follows',followsRoutes);
app.use('/api',commonRouter);
app.use('/api/reports',reportRouter);
app.use('/api/rates',rateRouter);
app.listen(port, function(){
  console.log('The server is listening on PORT: ' + port);
});
