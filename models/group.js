const { ObjectId } = require('mongodb');

class GroupModel {
  constructor(db) {
    this.collection = db.collection('groups');
  }

  async create(group) {
    return await this.collection.insertOne(group);
  }

  async findById(groupId) {
    return await this.collection.findOne({
      _id: new ObjectId(groupId)
    });
  }

  async addMember(groupId, memberId) {
    return await this.collection.updateOne(
      { _id: new ObjectId(groupId) },
      { $addToSet: { members: memberId } }
    );
  }

  async findGroupsByUser(userId) {
    return await this.collection
      .find({ members: userId })
      .toArray();
  }
}

module.exports = GroupModel;
