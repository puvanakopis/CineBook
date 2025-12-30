const express = require("express");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello Express ");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});