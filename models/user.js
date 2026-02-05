const { ObjectId } = require('mongodb');

function User(db) {
  this.collection = db.collection('users');
}

User.prototype.create = async function (user) {
  const result = await this.collection.insertOne(user);
  return { ...user, _id: result.insertedId };
};

User.prototype.findByEmail = async function (email) {
  return await this.collection.findOne({ email });
};

User.prototype.findById = async function (id) {
  return await this.collection.findOne({ _id: new ObjectId(id) });
};

module.exports = User;
