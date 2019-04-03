'use strict'

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0-mlp4u.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

// Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// let itemOne = Todo({item: 'get flowers'}).save(function(err){
//   if (err){
//     throw err;
//   }
//   console.log('item saved');
// });

// let data = [{item: 'get milk'}, {item: 'get me'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/todo', function(req, res){
    // get data from mongodb and pass it to veiw
    Todo.find({},function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });
  app.post('/todo', urlencodedParser, function(req, res){
      // get data from the view and add it to mongodb
      let newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        // needs to respond. If there is no data to return.
        res.json({});

      });
      // data.push(req.body);
      // res.json(data);
  });
  app.delete('/todo/:item', function(req, res){
      // delete the requested item from mongodb
      Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if (err) throw err;
        res.json(data);
      })
      // let data = data.filter(function(todo){
      //   return todo.item.replace(/ /g, '-') !== req.params.item;
      // });
      // console.log("DELETE request ", req.params.item, " ", data);
      // res.json(data);
  });
};
