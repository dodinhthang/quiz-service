var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/authenticate.js');
const config = require('../../config.js');
const Players = require('../../models/players.js');
const Question = require('../../models/question');

router.post('/answer', auth, (req, res) => {
  var question = Question.findById(req.body.questionId);
  var player_id;
  var player = Players.find({
    studentId: req.body.studentId
  });
  player.then(player => {
    console.log(player);
    this.player_id = player[0]._id;
    console.log(this.player_id);
  });
  question.then(quest => {
    if (quest.correctAnswer != req.body.answer) {
      Players.findById(this.player_id, function(err, player) {
        player.set({
          status: false
        });
        player.save();
      });
    } else {
      Players.findById(this.player_id, function(err, player) {
        player.set({
          lastTime: req.body.time
        });
        player.save();
      });
    }
  });
  console.log(req.body);
});
router.post('/check', auth, (req, res) => {
  var player = Players.find({
    studentId: req.body.studentId
  });

  player.then(player => {
    if (player[0].status == false || player[0].status == undefined) {
      res.json({
        code: 0,
        message: 'Da bi loai'
      });
      return;
    } else {
      res.json({
        code: 1,
        message: 'Khong bi loai'
      });
      return;
    }
  });

  console.log(req.body);
});
router.post('/checkSAT', auth, (req, res) => {
  var player = Players.find({
    studentId: req.body.studentId
  });

  player.then(player => {
    if (player[0].status == false || player[0].lastTime == -10) {
      res.json({
        code: 0,
        message: 'Da bi loai'
      });
      return;
    } else {
      Players.findById(player[0]._id, function(err, player) {
        player.set({
          lastTime: -10
        });
        player.save();
      });
      res.json({
        code: 1,
        message: 'Khong bi loai'
      });
      return;
    }
  });

  console.log(req.body);
});
module.exports = router;
