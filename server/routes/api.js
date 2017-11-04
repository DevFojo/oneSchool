const express = require('express');
const router = express.Router();
const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const ObjectID = mongoDb.ObjectID;
const Students_Collection = 'students';

const MongoDbUri = 'mongodb://admin:admin@ds119685.mlab.com:19685/oneschool';

// Connect
const connection = (closure) => {
  return MongoClient.connect(MongoDbUri, (err, db) => {
    if (err) return console.log(err);
    closure(db);
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};


router.get("/students", function (req, res) {
  connection((db) => {
    db.collection(Students_Collection)
      .find()
      .toArray()
      .then((students) => {
        response.data = students;
        res.json(response);
      })
      .catch((err) => {
        debugger;
        sendError(err, res);
      });
  });
});

router.post("/students", function (req, res) {
  var newStudent = req.body;
  connection((db) => {
    db.collection(Students_Collection)
      .save(req.body, (err, result) => {
        if (err) {
          return console.log(err);
        }
        return console.log(result);
      });
    // .then((students) => {
    //   response.data = students;
    //   res.json(response);
    // })
    // .catch((err) => {
    //   debugger;
    //   sendError(err, res);
    // });
  });
});
// app.post("/api/students", function (req, res) {
//   var newContact = req.body;
//   newContact.createDate = new Date();

//   if (!req.body.name) {
//     handleError(res, "Invalid user input", "Must provide a name.", 400);
//   }

//   db.collection(CONTACTS_COLLECTION).insertOne(newContact, function (err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to create new student.");
//     } else {
//       res.status(201).json(doc.ops[0]);
//     }
//   });
// });

// app.get("/api/students/:id", function (req, res) {
//   db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to get student");
//     } else {
//       res.status(200).json(doc);
//     }
//   });
// });

// app.put("/api/students/:id", function (req, res) {
//   var updateDoc = req.body;
//   delete updateDoc._id;

//   db.collection(CONTACTS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to update student");
//     } else {
//       updateDoc._id = req.params.id;
//       res.status(200).json(updateDoc);
//     }
//   });
// });

// app.delete("/api/students/:id", function (req, res) {
//   db.collection(CONTACTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
//     if (err) {
//       handleError(res, err.message, "Failed to delete student");
//     } else {
//       res.status(200).json(req.params.id);
//     }
//   });
// });
// Get users
router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

module.exports = router;
