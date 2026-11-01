const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to accept JSON data

// Sample GET route
app.route('/api/message').get((req, res) => {
  res.json({ message: "Hello from the backend server!" });
});

// Sample POST route (receiving data from React)
app.route('/api/data').post((req, res) => {
  const { name } = req.body;
  res.json({ success: true, responseMessage: `Received your name, ${name}!` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});