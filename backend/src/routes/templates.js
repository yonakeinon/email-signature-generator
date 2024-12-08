const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  const templatesDir = path.join(__dirname, "../templates");
  fs.readdir(templatesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch templates." });
    }

    const templates = files.map((file) => path.parse(file).name); // Extract template names

    res.json({ templates });
  });
});

module.exports = router;
