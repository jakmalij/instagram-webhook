const express = require("express");
const app = express();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "my_secret_token_123";

app.use(express.json());

app.get("/webhook", (req, res) => {
    console.log("🔍 Incoming GET request to /webhook");
    console.log("👉 Query Params:", req.query);

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("✅ Verification successful! Sending challenge:", challenge);
        res.status(200).send(challenge);
    } else {
        console.log("❌ Verification failed! Invalid token or request.");
        res.status(403).send("Forbidden");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




