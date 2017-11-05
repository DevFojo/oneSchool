var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
const MongoDbUri = 'mongodb://admin:admin@ds119685.mlab.com:19685/oneschool';

var db = mongojs(MongoDbUri, ['students']);

// Get All Todos
router.get('/students', function (req, res, next) {
  db.students.find(function (err, students) {
    if (err) {
      res.send(err);
    } else {
      res.json(students);
    }
  });
});

// Get Single Todo
router.get('/student/:id', function (req, res, next) {
  db.students.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function (err, student) {
    if (err) {
      res.send(err);
    } else {
      res.json(student);
    }
  });
});

// Save Todo
router.post('/student', function (req, res, next) {
  var student = req.body;
  console.log(req);
  if (!student.text || !(student.isCompleted + '')) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.students.save(student, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

// Update Todo
router.put('/student/:id', function (req, res, next) {
  var student = req.body;
  delete student._id;
  if (!student) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.students.update({
      _id: mongojs.ObjectId(req.params.id)
    }, student, {}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

// Delete Todo
router.delete('/student/:id', function (req, res, next) {
  db.students.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, '', function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;

