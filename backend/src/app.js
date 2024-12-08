const express = require("express");
const cors = require("cors");
const templatesRoutes = require("./routes/templates");
const signaturesRoutes = require("./routes/signatures");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/templates", templatesRoutes);
app.use("/api/signature", signaturesRoutes);

module.exports = app; // Export the app instance
