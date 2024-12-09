const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const users = require("./src/users/users.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const FILE_PATH = path.join(__dirname, "./src/users/users.json");

//user

app.get("/users", (req, res) => {
  res.send(users);
});

//login request

app.post("/user/api/login", (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const { password: _, ...userData } = user;

  res.status(200).json(userData);
});

// add new entrie in to file
app.post("/add-entry", (req, res) => {
  const newEntry = req.body;

  try {
    let existingData = [];
    if (fs.existsSync(FILE_PATH)) {
      const fileContent = fs.readFileSync(FILE_PATH, "utf-8");
      existingData = fileContent ? JSON.parse(fileContent) : [];
    }

    if (existingData.some((entry) => entry.email === newEntry.email)) {
      return res.status(409).json({ message: "Duplicate entry detected." });
    }

    existingData.push(newEntry);

    fs.writeFileSync(FILE_PATH, JSON.stringify(existingData, null, 2), "utf-8");

    res.status(201).json({ message: "Entry added successfully!" });
  } catch (error) {
    console.error("Error handling data:", error);
    res.status(500).json({ message: "Failed to process the entry.", error });
  }
});

// server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
