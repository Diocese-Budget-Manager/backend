const db = require("../helpers/db");

const parishSchema = new db.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  diocese: { type: db.Schema.Types.ObjectId, ref: "Diocese", required: true },
  budgetAllocation: {
    type: Number,
    default: 0,
  },
  budgetYear: { type: Number, required: true }, // Add budgetYear field
  budgetQuarter: { type: Number, min: 1, max: 4, required: true }, // Add budgetQuarter field
});

parishSchema.pre("save", async function (next) {
  const parish = this;
  const diocese = await db.model("Diocese").findById(parish.diocese);
  if (diocese) {
    diocese.parish.push(parish._id);
    await diocese.save();
  }
  next();
});

const Parish = db.model("Parish", parishSchema);

module.exports = Parish;
