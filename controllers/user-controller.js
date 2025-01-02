const firebase = require("../helpers/firebase");
const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

const { ObjectId } = require("mongodb");

const createUser = async (req, res) => {
  
  const { email, role } = req.body;
  const roleId = new ObjectId(role);
  let firebaseUser;
  try {

    // const adminUser = await User.findOne({uid: req.user.uid});

    firebaseUser = await firebase
      .createUser({
        email: email,
        password: "123456",
      })
      .then(async (response) => {
        if (response.uid) {
          try {
            const user = await User.create({
              ...req.body,
              uid: response.uid,
              role: roleId,
            });
            await ActivityLog.create({
              detials: `User ${user.username} has been created`,
              user: user._id,
              activityType: "createUser",
            });
            res.status(201).json(user);
          } catch (error) {
            if (response.uid) {
              try {
                await firebase.deleteUser(response.uid);
              } catch (deleteError) {
                console.error("Failed to delete Firebase user:", deleteError);
              }
            }
            throw new Error(error);
          }
        }
      });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    await ActivityLog.create({
      details: `User ${user.username} has been updated`,
      user: user._id,
      activityType: "updateUser",
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    await ActivityLog.create({
      details: `User ${user.username} has been deleted`,
      user: user._id,
    });
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
