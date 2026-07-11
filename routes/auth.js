const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/login", async (req, res) => {
  try {
    const apiKey = process.env.MONNIFY_API_KEY;
    const secretKey = process.env.MONNIFY_SECRET_KEY;

    const auth = Buffer.from(`${apiKey}:${secretKey}`).toString("base64");

    const response = await axios.post(
      "https://sandbox.monnify.com/api/v1/auth/login",
      {},
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
