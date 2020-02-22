const Question = require('../../models/question.js');
const Roles = require('../../models/role.js');
let Answer1 = 0;
let Answer2 = 0;
let Answer3 = 0;
let Answer4 = 0;
module.exports = function(socket) {
  return function(data) {
    console.log(data);
    if (data.command === 1000 || data.command === 1001) {
      const question = Question.findById(data.message);
      question.then(quest => {
        if (!quest) {
          res.json({
            code: config.CODE_ERR_WITH_MESS,
            message: 'question not found'
          });
          return;
        }
        // let test = new Roles({
        //   name: 'test'
        // });
        // test.save();
        // Roles.findById('5ae87aca4c7d670f40499b1a', function(err, tank) {
        //   tank.set({ name: 'rename' });
        //   tank.save();
        // });
        socket.broadcast.emit('receiveQuestion', { message: quest });
      });
    }
    if (data.command === 3000) {
      console.log(data.message);
      socket.broadcast.emit('viewerSubmit', { message: data.message });

      // switch (data.message) {
      //   case 1: {
      //     socket.emit('viewerSubmit', {message: data.Answer1});
      //     break;
      //   }
      //   case 2: {
      //     this.Answer2++;
      //     console.log(this.Answer2);
      //     break;
      //   }
      //   case 3: {
      //     this.Answer3++;
      //     console.log(this.Answer3);
      //     break;
      //   }
      //   case 4: {
      //     this.Answer4++;
      //     console.log(this.Answer4);
      //     break;
      //   }
      // }
    }
  };
};
