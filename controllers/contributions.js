const Contributions = require("../models/Contributions");
const ActivityLog = require("../models/ActivityLog");
const User = require("../models/User");
const Parish = require("../models/Parish");

const getAllContributions = async (req, res) => {
  try {
    const contributions = await Contributions.find();
    res.status(200).json(contributions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createContribution = async (req, res) => {
  const { parish, diocese } = req.body;
  try {
    const contribution = await Contributions.create(req.body);
    const adminUser = await User.findOne({ uid: req.user.uid });
    if (contribution) {
      await ActivityLog.create({
        details: `Contribution of ${contribution.amount} has been created`,
        user: adminUser._id,
        parish: parish,
        diocese: diocese,
        activityType: "createContribution",
      });
    }
    res.status(201).json(contribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateContribution = async (req, res) => {
  const adminUser = await User.findOne({ uid: req.user.uid });
  const parish = await Parish.findById(req.body.parish).populate("diocese");
  try {
    const contribution = await Contributions.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    if (contribution) {
      await ActivityLog.create({
        details: `Contribution of ${contribution.amount} has been updated`,
        user: adminUser._id,
        parish: parish._id,
        diocese: parish.diocese._id,
        activityType: "updateContribution",
      });
    }
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

const getParishContributions = async (req, res) => {
  try {
    const contributions = await Contributions.find({
      parish: req.params.id,
    });
    res.status(200).json(contributions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const searchContributions = async (req, res) => {
  try {
    const contributions = await Contributions.find({
      ...req.body,
    });
    res.status(200).json(contributions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteContribution = async (req, res) => {
  const adminUser = await User.findOne({ uid: req.user.uid });
  const parish = await Parish.findById(req.body.parish).populate("diocese");
  try {
    await Contributions.findByIdAndDelete(req.params.id);
    await ActivityLog.create({
      details: `Contribution has been deleted`,
      user: adminUser._id,
      parish: parish._id,
      diocese: parish.diocese._id,
      activityType: "deleteContribution",
    });
    res.status(200).json({ message: "Contribution has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllContributions,
  createContribution,
  updateContribution,
  getContributionById,
  getParishContributions,
  searchContributions,
  deleteContribution,
};
