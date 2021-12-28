import { Todo } from './app/models/Todo';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://nx-todo:9Ah0Xrv1D5fKtvg8@nx-todo.luvr6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri)
.then(() => {
  console.log("Connected To DB")
})
.catch(() => {
  console.log('Failed to connect to db')
})

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todo/new', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save();
  res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id)
  res.json(result);
});

app.put('/todo/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
