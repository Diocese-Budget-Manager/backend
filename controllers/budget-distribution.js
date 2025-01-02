const BudgetDistribution = require("../models/BudgetDistribution");

const getAllBudgets = async (req, res) => {
  try {
    const budgetDistributions = await BudgetDistribution.find();
    res.status(200).json(budgetDistributions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getBudgetById = async (req, res) => {
  try {
    const budgetDistribution = await BudgetDistribution.findById(req.params.id);
    res.status(200).json(budgetDistribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createBudget = async (req, res) => {
  try {
    const budgetDistribution = await BudgetDistribution.create(req.body);
    res.status(201).json(budgetDistribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateBudget = async (req, res) => {
  try {
    const budgetDistribution = await BudgetDistribution.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json(budgetDistribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteBudget = async (req, res) => {
  try {
    const budgetDistribution = await BudgetDistribution.findByIdAndDelete(
      req.params.id,
    );
    res.status(200).json(budgetDistribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
};
