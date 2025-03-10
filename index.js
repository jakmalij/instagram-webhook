const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "my_secret_token_123"; // Ensure this matches your FB settings

app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.status(403).send("Forbidden");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




