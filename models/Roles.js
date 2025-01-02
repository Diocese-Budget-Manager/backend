const mongoose = require("../helpers/db");

const rolesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
});

const Roles = mongoose.model("Roles", rolesSchema);

module.exports = Roles;