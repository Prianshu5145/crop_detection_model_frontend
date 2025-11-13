const Disease = require("../Model/Disease");

const createDisease = async (req, res) => {
  try {
    const disease = new Disease(req.body);
    await disease.save();
    res.status(201).json({
      success: true,
      message: "Disease added successfully",
      data: disease
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding disease",
      error: error.message
    });
  }
};

const getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseases
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching diseases",
      error: error.message
    });
  }
};

const getDiseaseByCropAndName = async (req, res) => {
  try {
    const { crop, diseaseName } = req.params;

    const disease = await Disease.findOne({
      crop: new RegExp(`^${crop}$`, "i"),
      diseaseName: new RegExp(`^${diseaseName}$`, "i")
    });

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: "Disease not found for given crop and name"
      });
    }

    res.status(200).json({
      success: true,
      data: disease
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching disease",
      error: error.message
    });
  }
};

const updateDiseaseByCropAndName = async (req, res) => {
  try {
    const { crop, diseaseName } = req.params;

    const updatedDisease = await Disease.findOneAndUpdate(
      {
        crop: new RegExp(`^${crop}$`, "i"),
        diseaseName: new RegExp(`^${diseaseName}$`, "i")
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDisease) {
      return res.status(404).json({
        success: false,
        message: "Disease not found to update"
      });
    }

    res.status(200).json({
      success: true,
      message: "Disease updated successfully",
      data: updatedDisease
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating disease",
      error: error.message
    });
  }
};

const deleteDiseaseByCropAndName = async (req, res) => {
  try {
    const { crop, diseaseName } = req.params;

    const deletedDisease = await Disease.findOneAndDelete({
      crop: new RegExp(`^${crop}$`, "i"),
      diseaseName: new RegExp(`^${diseaseName}$`, "i")
    });

    if (!deletedDisease) {
      return res.status(404).json({
        success: false,
        message: "Disease not found to delete"
      });
    }

    res.status(200).json({
      success: true,
      message: "Disease deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting disease",
      error: error.message
    });
  }
};

module.exports = {
  createDisease,
  getAllDiseases,
  getDiseaseByCropAndName,
  updateDiseaseByCropAndName,
  deleteDiseaseByCropAndName
};
