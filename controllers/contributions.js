const Contributions = require("../models/Contributions");

const getAllContributions = async (req, res) => {
  try {
    const contributions = await Contributions.find();
    res.status(200).json(contributions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createContribution = async (req, res) => {
  try {
    const contribution = await Contributions.create(req.body);
    res.status(201).json(contribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateContribution = async (req, res) => {
  try {
    const contribution = await Contributions.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json(contribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getContributionById = async (req, res) => {
  try {
    const contribution = await Contributions.findById(req.params.id);
    res.status(200).json(contribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteContribution = async (req, res) => {
  try {
    const contribution = await Contributions.findByIdAndDelete(req.params.id);
    res.status(200).json(contribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllContributions,
  createContribution,
  updateContribution,
  getContributionById,
  deleteContribution,
};
