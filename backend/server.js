const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo-db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// نموذج To-Do
const todoSchema = new mongoose.Schema({
  title: String
});
const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = new Todo({ title: req.body.title });
  await todo.save();
  res.json(todo);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
