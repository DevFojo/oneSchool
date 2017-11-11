var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
const MongoDbUri = 'mongodb://admin:admin@ds119685.mlab.com:19685/oneschool';

var studentCollection = mongojs(MongoDbUri, ['students']);
var facultyCollection = mongojs(MongoDbUri, ['faculties']);
var departmentCollection = mongojs(MongoDbUri, ['departments']);

router.get('/students', function (req, res, next) {
  studentCollection.students.find(function (err, students) {
    if (err) {
      res.send(err);
    } else {
      res.json(students);
    }
  });
});

router.get('/student/:id', function (req, res, next) {
  studentCollection.students.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function (err, student) {
    if (err) {
      res.send(err);
    } else {
      res.json(student);
    }
  });
});

router.post('/student', function (req, res, next) {
  var student = req.body;
  console.log(req);
  if (!student) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    studentCollection.students.save(student, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

router.put('/student/:id', function (req, res, next) {
  var student = req.body;
  delete student._id;
  if (!student) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    studentCollection.students.update({
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

router.delete('/student/:id', function (req, res, next) {
  studentCollection.students.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, '', function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});


router.get('/faculties', function (req, res, next) {
  facultyCollection.faculties.find(function (err, faculties) {
    if (err) {
      res.send(err);
    } else {
      res.json(faculties);
    }
  });
});

router.get('/departments', function (req, res, next) {
  departmentCollection.departments.find(function (err, departments) {
    if (err) {
      res.send(err);
    } else {
      res.json(departments);
    }
  });
});

module.exports = router;

