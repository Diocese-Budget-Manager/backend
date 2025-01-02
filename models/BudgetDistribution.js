const mongoose = require("../helpers/db");

const budgetDistributionSchema = new mongoose.Schema({
  diocese: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Diocese",
    required: true,
  },
  parish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parish",
    required: true,
  },
  budgetAllocation: {
    type: Number,
    required: true,
  },
  actualExpenditure: {
    type: Number,
    default: 0,
  },
  budgetYear: { type: Number, required: true }, // Add budgetYear field
  budgetQuarter: { type: Number, min: 1, max: 4, required: true }, // Add budgetQuarter field
  description: {
    type: String,
  },
  notes: {
    type: String,
  },
});

const BudgetDistribution = mongoose.model(
  "BudgetDistribution",
  budgetDistributionSchema,
);

module.exports = BudgetDistribution;
