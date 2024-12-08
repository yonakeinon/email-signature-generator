const express = require("express");
const path = require("path");
const cors = require("cors");
const templatesRoutes = require("./routes/templates");
const signaturesRoutes = require("./routes/signatures");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

app.use("/api/templates", templatesRoutes);
app.use("/api/signature", signaturesRoutes);

module.exports = app; 
