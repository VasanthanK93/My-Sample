var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

router.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname+"/../views/index.html"));
});

/**
 * Configure JWT
 */
//var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//var bcrypt = require('bcryptjs');
//var config = require('../config'); // get config file

/*'router.post('/login', function(req, res) {

  User.findOne({ loginid: req.body.loginid,password:req.body.password }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    if (user) return res.status(200).send('success');
    
    // check if the password is valid
   var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {

 // var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    loginid : req.body.loginid,
    password : req.body.password
  }, 
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user`.");

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});*/

router.post('/register',function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
    var user={
        "name":req.body.name,
        "loginid":req.body.loginid,
        "password":req.body.password
    };
    console.log(user);
    
    User.user.findOne({"loginid":req.body.loginid},function(err,doc){
        if(err){
            res.json(err); 
        }
        if(doc == null){
            User.user.create({user},function(err,doc){
                if(err) res.json(err);
                else{
                    res.send("success");
                }
            });
        }else{
            res.send("User already found");
        }
    })
    
});

var loginid=null;
var users={};

router.post('/login',function(req,res){
    console.log(req.body.loginid);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
    loginid = req.body.loginid;
    User.user.findOne({"handle":req.body.loginid, "password":req.body.password},function(err,doc){
        if(err){
            res.send(err); 
        }
        if(doc==null){
            res.send("User has not registered");
        }
        else{
            console.log("Asas"+__dirname);
//                res.sendFile(path.resolve(__dirname+"/../views/chat1.html"));
            res.send("success");
        }
        
});
});

module.exports = router;