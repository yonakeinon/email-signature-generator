const express = require("express");
const cors = require("cors");
const templatesRoutes = require("./routes/templates");
const signaturesRoutes = require("./routes/signatures");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/templates", templatesRoutes);
app.use("/api/signature", signaturesRoutes);

module.exports = app; 
