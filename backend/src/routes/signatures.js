const express = require("express");
const path = require("path");
const Queue = require("bull"); 
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

const bulkQueue = new Queue("bulk-signature-queue");

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
      ${fullName}
      Email: ${email}
      Phone: ${phone}
    `;

    res.json({
      htmlSignature: html,
      plainTextSignature: plainTextSignature.trim(),
    });
  });
});

router.post("/batch", async (req, res) => {
  const { templateName, users, webhookUrl } = req.body;

  // Validate input
  if (!templateName || !users || !webhookUrl || !Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ error: "Template name, users list, and webhook URL are required." });
  }

  // Add each user to the queue for processing
  users.forEach((user) => {
    bulkQueue.add({ templateName, user, webhookUrl });
  });

  // Respond immediately
  res.json({ message: "Bulk request received. Processing asynchronously." });
});

// Process the Bulk Queue
bulkQueue.process(async (job) => {
  const { templateName, user, webhookUrl } = job.data;

  try {
    // Determine the path to the selected template
    const templatePath = path.join(__dirname, "../templates", `${templateName}.ejs`);

    // Render the selected template with user data
    const renderedHtml = await new Promise((resolve, reject) => {
      job.queue.client.get(templatePath, user, (err, html) => {
        if (err) reject(err);
        else resolve(html);
      });
    });

    const plainTextSignature = `
      ${user.fullName}
      Email: ${user.email}
      Phone: ${user.phone}
    `;

    // Send the generated signature to the webhook
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        htmlSignature: renderedHtml,
        plainTextSignature: plainTextSignature.trim(),
        user,
      }),
    });

    console.log(`Successfully processed signature for ${user.fullName}`);
  } catch (error) {
    console.error(`Error processing signature for ${user.fullName}:`, error);
  }
});

module.exports = router;
