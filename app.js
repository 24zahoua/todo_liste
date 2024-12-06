// Import Express
const express = require('express');

// Initialize the Express app
const app = express();

// Define a port
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello there Welcome to my To-Do App Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Mock database
let todos = [];

// Create a task
app.post('/todos', (req, res) => {
  const { id, task } = req.body;
  todos.push({ id, task });
  res.status(201).send('Task created!');
});

// Get all tasks
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Update a task
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const todo = todos.find(t => t.id === parseInt(id));
  if (todo) {
    todo.task = task;
    res.send('Task updated!');
  } else {
    res.status(404).send('Task not found.');
  }
});

// Delete a task
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(t => t.id !== parseInt(id));
  res.send('Task deleted!');
});
