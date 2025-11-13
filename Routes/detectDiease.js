const express = require("express");
const multer = require("multer");
const { detectCropDisease } = require("../Controller/detectdiseaseController");

const router = express.Router();

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Route
router.post("/crop", upload.single("image"), detectCropDisease);

module.exports = router;
