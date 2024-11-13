const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend', 'build')));

// Handle any requests that don't match the static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'src', 'index.js'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
