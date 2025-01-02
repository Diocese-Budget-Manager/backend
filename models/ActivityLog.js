const mongoose = require("../helpers/db");

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  diocese: { type: mongoose.Schema.Types.ObjectId, ref: "Diocese" },
  parish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parish",
  },
  ipAddress: { type: String },
  userAgent: { type: String },
  location: { type: String, default: "" },
  activityType: {
    type: String,
  },
  details: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

module.exports = ActivityLog;
