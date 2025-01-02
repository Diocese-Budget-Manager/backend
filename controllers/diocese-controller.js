const Diocese = require("../models/Diocese");
const ActivityLog = require("../models/ActivityLog");
const User = require("../models/User");
const getAllDioceses = async (req, res) => {
  try {
    const dioceses = await Diocese.find();
    res.status(200).json(dioceses);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createDiocese = async (req, res) => {
  // console.log("Data: ", req.body);
  const data = req.body;
  const { user } = req;

  try {
    const adminUser = await User.findOne({ uid: user.uid });
    const diocese = new Diocese(data);
    await diocese.save();

    if (diocese && adminUser) {
      await ActivityLog.create({
        details: `Diocese ${diocese.name} has been created`,
        user: adminUser._id,
        diocese: diocese._id,
        activityType: "createDiocese",
      });
    }

    res.status(201).json(diocese);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateDiocese = async (req, res) => {
  try {
    const diocese = await Diocese.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (diocese) {
      const { user } = req;
      const adminUser = await User.findOne({ uid: user.uid });
      await ActivityLog.create({
        details: `Diocese ${diocese.name} has been updated`,
        user: adminUser._id,
        diocese: diocese._id,
        activityType: "updateDiocese",
      });
    }
    res.status(200).json(diocese);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getDioceseById = async (req, res) => {
  try {
    const diocese = await Diocese.findById(req.params.id);
    res.status(200).json(diocese);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllDioceses = getAllDioceses;
exports.createDiocese = createDiocese;
exports.updateDiocese = updateDiocese;
exports.getDioceseById = getDioceseById;
