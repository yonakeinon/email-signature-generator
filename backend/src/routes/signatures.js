const express = require("express");
const router = express.Router();
const path = require("path");

router.post("/", (req, res) => {
  const { templateName, fullName, email, phone, logo } = req.body;


  if (!templateName || !fullName || !email || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }

 
  const templatePath = path.join(__dirname, "../templates", `${templateName}.ejs`);

 
  res.render(templatePath, { fullName, email, phone, logo }, (err, html) => {
    if (err) {
      console.error("Error rendering template:", err);
      return res.status(500).json({ error: "Template rendering failed." });
    }

  
    const plainTextSignature = `
      ${fullName || "[Name Not Provided]"}
      Email: ${email || "[Email Not Provided]"}
      Phone: ${phone || "[Phone Not Provided]"}
    `;

    res.json({
      htmlSignature: html,
      plainTextSignature: plainTextSignature.trim(),
    });
  });
});

module.exports = router;
