const db = require('../helpers/db');

const contributionsSchema = new db.Schema({
  diocese: {
    type: db.Schema.Types.ObjectId,
    ref: "Diocese",
    required: true,
  },
  parish: {
    type: db.Schema.Types.ObjectId,
    ref: "Parish",
    required: true,
  },
  source: { type: String, required: true }, // e.g. Offering, Tithe, Fundraising, Salaries, etc.
  type: { type: String, enum: ["income", "expence"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  notes: { type: String },
});

const Contributions = db.model('Contributions', contributionsSchema);

module.exports = Contributions;