var express = require('express');
var router = express.Router();
const db = require('monk')(process.env.mongo_url || 'localhost:27017/registerDB')
const { check , validationResult } = require('express-validator');
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Desktop03', { title: 'Express' });
});

router.post('/', [
  check("email","").not().isEmpty(),
  check("password","").not().isEmpty()
], function(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.render('Desktop03');
  }else{
    var ct = db.get('Blogs');
    ct.find({$and:[{email:req.body.email}, {password1:req.body.password}]}).then((doc1) => {
      if(doc1.length == 0){
        res.render('Desktop03');
      }else{
        res.render('Desktop02v2');
      }
    });
  }
});

module.exports = router;