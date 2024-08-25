const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Handle POST requests
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  // Logging the received data for debugging
  console.log("Received data:", data);

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      error: "Invalid data format. Expected an array.",
    });
  }

  // Process the data
  const numbers = data.filter((item) => !isNaN(item) && item.trim() !== "");
  const alphabets = data.filter((item) => isNaN(item) && item.trim() !== "");
  const highestLowercaseAlphabet = alphabets
    .filter((char) => char.length === 1 && char >= "a" && char <= "z")
    .sort()
    .reverse()
    .slice(0, 1);

  // Respond with the processed data
  res.json({
    is_success: true,
    user_id: "mehul2004",
    email: "mehulmickey2004@gmail.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// Handle GET requests
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
