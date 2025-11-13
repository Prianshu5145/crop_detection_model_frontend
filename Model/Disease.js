const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
  {
    crop: { type: String, required: true },
    diseaseName: { type: String, required: true },
    cause: { type: [String] },
    symptoms: { type: [String] },
    prevention: { type: [String] },
    treatment: { type: [String] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Disease", diseaseSchema);
