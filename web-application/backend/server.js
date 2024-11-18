const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '../frontend', 'build')));

app.use(express.json());

// Catch-all handler for React's routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
