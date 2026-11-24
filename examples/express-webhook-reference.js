/**
 * OmniReply AI — illustrative Express route patterns.
 * Reconstructed from recorded behavior; not the exact original source.
 * Verify current Meta webhook/API requirements before production use.
 */
const express = require("express");
const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "OmniReply AI",
    status: "running",
    timestamp: new Date().toISOString()
  });
});

app.get("/webhooks/meta", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post("/webhooks/meta", (req, res) => {
  // Production code should validate X-Hub-Signature-256 before trusting payloads.
  const body = req.body;
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value ?? {};
      for (const message of value.messages ?? []) {
        console.log("Inbound WhatsApp message", {
          sender: message.from,
          messageType: message.type,
          text: message.text?.body ?? ""
        });
        // TODO: pass normalized message to the reply service.
        // Real-recipient reply delivery was not confirmed in project records.
      }
    }
  }
  return res.sendStatus(200);
});

module.exports = app;
