var express = require('express');
var router = express.Router();
const db = require('monk')('localhost:27017/registerDB')
const { check , validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Desktop04', { title: 'Express' });
});

router.post('/', [
  check("username","").not().isEmpty(),
  check("email","").not().isEmpty(),
  check("phone","").not().isEmpty(),
  check("password1","").not().isEmpty(),
  check("password2","").not().isEmpty(),
],function(req,res,next) {
  const result = validationResult(req);
  if(!result.isEmpty()){
    res.render('Desktop04');
  }
  else{
    var ct=db.get('Blogs');
    ct.find({$or:[{email:req.body.email}, {username:req.body.username}]}).then((doc1) => {
      if(doc1.length == 0 ){
        ct.insert({
          username:req.body.username,
          email:req.body.email,
          phone:req.body.phone,
          password1:req.body.password1
        })  
        res.render('Desktop02v2');
      } else {
        res.render('Desktop04');
      }
    });
  }
});
module.exports = router;