const db = require("../helpers/db");

const userSchema = new db.Schema({
    uid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: db.Schema.Types.ObjectId, ref: "Roles", required: true },
    diocese: { type: db.Schema.Types.ObjectId, ref: "Diocese" },
    parish: { type: db.Schema.Types.ObjectId, ref: "Parish" },
});

const User = db.model("User", userSchema);

module.exports = User;