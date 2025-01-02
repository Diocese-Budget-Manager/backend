const Roles = require("../models/Roles");

const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Roles.findById(req.params.id);
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRole = async (req, res) => {
  try {
    const role = await Roles.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateRole = async (req, res) => {
  try {
    const role = await Roles.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteRole = async (req, res) => {
  try {
    const role = await Roles.findByIdAndDelete(req.params.id);
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
