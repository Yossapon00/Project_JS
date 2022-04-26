var express = require('express');
var router = express.Router();
const db = require('monk')('localhost:27017/registerDB')
const { check , validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Desktop05');
});

router.post('/', [
  check("Dormitory","").not().isEmpty(),
  check("Room","").not().isEmpty(),
  check("Appointment_request","").not().isEmpty(),
  check("TimeStart","").not().isEmpty(),
  check("TimeStop","").not().isEmpty(),
  check("Participant","").not().isEmpty(),
],function(req,res,next) {
  const result = validationResult(req);
  if(!result.isEmpty()){
    res.render('Desktop05');
  }
  else{
    var ct=db.get('Time_data');
    ct.find({$and:[{Dormitory:req.body.Dormitory}, {Room:req.body.Room},
       {Appointment_request:req.body.Appointment_request}]}).then((doc1) => {
      if(doc1.length == 0 ){
        ct.insert({
          Dormitory:req.body.Dormitory,
          Room:req.body.Room,
          Appointment_request:req.body.Appointment_request,
          TimeStart:req.body.TimeStart,
          TimeStop:req.body.TimeStop,
          Participant:req.body.Participant
        })
        ct.find({}, {projection: {
          _id: 0,
          Dormitory: 1,
          Room: 1,
          Appointment_request: 1,
          TimeStart: 1,
          TimeStop: 1,
          Participant: 1
        }}).then(result => {
          res.render('Desktop06',{data: result});
        });
      } else {
        res.render('Desktop05');
      }
    });
  }
});
module.exports = router;