const db = require("../helpers/db");

const dioceseSchema = new db.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  image: { type: String },
  description: { type: String },
  parish: [{ type: db.Schema.Types.ObjectId, ref: "Parish" }],
  budgetAllocation: {
    type: Number,
    default: 0,
  },
  budgetYear: { type: Number, required: true }, // Add budgetYear field
  budgetQuarter: { type: Number, min: 1, max: 4, required: true }, // Add budgetQuarter field
});

const Diocese = db.model("Diocese", dioceseSchema);

module.exports = Diocese;
