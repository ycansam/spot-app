const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

module.exports = app;