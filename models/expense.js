const { ObjectId } = require('mongodb');

class ExpenseModel {
  constructor(db) {
    this.collection = db.collection('expenses');
  }

  create(expense) {
    return this.collection.insertOne(expense);
  }

  findById(expenseId) {
    return this.collection.findOne({ _id: new ObjectId(expenseId) });
  }

  findByGroup(groupId) {
    return this.collection
      .find({ groupId })
      .toArray();
  }

  deleteById(expenseId) {
    return this.collection.deleteOne({ _id: new ObjectId(expenseId) });
  }
}

module.exports = ExpenseModel;
