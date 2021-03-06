var express = require('express');
var router = express.Router();
const db = require('monk')(process.env.mongo_url || 'localhost:27017/registerDB')
require('dotenv').config()

router.get('/', function(req, res, next) {
  var ct = db.get('Time_data');
  ct.find({}, {projection: {
    _id: 0,
    UName: 1,
    Dormitory: 1,
    Room: 1,
    Appointment_request: 1,
    TimeStart: 1,
    TimeStop: 1,
    Participant: 1
  }
}).then(result => {
    res.render('Desktop06v2',{data: result});
  });
});

module.exports = router;
