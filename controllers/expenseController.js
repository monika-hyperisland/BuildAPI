const { ObjectId } = require('mongodb');
const ExpenseModel = require('../models/expense');

exports.addExpense = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const expenseModel = new ExpenseModel(db);

    const { groupId, description, amount, splitWith } = req.body;

    if (!groupId || !description || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const expense = {
      groupId,
      description,
      amount,
      paidBy: req.user.id,
      participants: splitWith && splitWith.length > 0 ? splitWith : [req.user.id],
      createdAt: new Date()
    };

    const result = await expenseModel.create(expense);

    res.status(201).json(result.insertedId);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add expense' });
  }
};


exports.getGroupExpenses = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const expenseModel = new ExpenseModel(db);

    const { groupId } = req.params;

    const expenses = await expenseModel.findByGroup(groupId);

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const expenseModel = new ExpenseModel(db);

    const { expenseId } = req.params;

    const expense = await expenseModel.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.paidBy !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete expenses you added' });
    }

    await expenseModel.deleteById(expenseId);

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense' });
  }
};
