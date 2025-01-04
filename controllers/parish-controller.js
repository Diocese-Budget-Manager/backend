const Parish = require("../models/Parish");
const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");
const Diocese = require("../models/Diocese");

const getAllParishes = async (req, res) => {
  try {
    const parishes = await Parish.find().populate("diocese");
    res.status(200).json(parishes);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createParish = async (req, res) => {
  const { user } = req;
  const { diocese } = req.body;
  try {
    const adminUser = await User.findOne({ uid: user.uid });
    // const dioceseData = await Diocese.findById(diocese);
    const parish = await Parish.create(req.body);

    if (parish && adminUser) {
      // await dioceseData.updateOne({ $push: { parish: parish._id } });
      await ActivityLog.create({
        details: `Parish ${parish.name} has been created`,
        user: adminUser._id,
        parish: parish._id,
        activityType: "createParish",
      });
    }
    res.status(201).json(parish);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateParish = async (req, res) => {
  try {
    const parish = await Parish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("diocese");
    
    const adminUser = await User.findOne({ uid: req.user.uid });

    if (parish) {
      await ActivityLog.create({
        details: `Parish ${parish.name} has been updated`,
        user: adminUser._id,
        parish: parish._id,
        activityType: "updateParish",
      });
    }
    res.status(200).json(parish);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getParishById = async (req, res) => {
  try {
    const parish = await Parish.findById(req.params.id).populate("diocese");
    res.status(200).json(parish);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteParish = async (req, res) => {
  try {
    await Parish.findByIdAndDelete(req.params.id);
    await Diocese.updateOne(
      { parish: req.params.id },
      { $pull: { parish: req.params.id } },
    );
    res.status(200).json({ message: "Parish deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllParishes = getAllParishes;
exports.createParish = createParish;
exports.updateParish = updateParish;
exports.getParishById = getParishById;
exports.deleteParish = deleteParish;
[];
