const express = require("express");
const {
  createDisease,
  getAllDiseases,
  getDiseaseByCropAndName,
  updateDiseaseByCropAndName,
  deleteDiseaseByCropAndName
} = require("../Controller/diseaseController.js");

const router = express.Router();

router.post("/create", createDisease);
router.get("/", getAllDiseases);
router.get("/:crop/:diseaseName", getDiseaseByCropAndName);
router.put("/:crop/:diseaseName", updateDiseaseByCropAndName);
router.delete("/:crop/:diseaseName", deleteDiseaseByCropAndName);

module.exports = router;
