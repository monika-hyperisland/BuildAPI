const { ObjectId } = require('mongodb');
const GroupModel = require('../models/group');

exports.createGroup = async (req, res) => {
  try {
  const db = req.app.locals.db;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Group name required' });
  }

  const group = {
    name,
    ownerId: req.user.id,
    members: [req.user.id],
    createdAt: new Date()
  };

  const result = await groupModel.create(group);

  res.status(201).json(result.insertedId);
  } catch (err) {
        res.status(500).json({ message: 'Failed to create group' });
  }
  };

exports.addMember = async (req, res) => {
  try {
  const db = req.app.locals.db;
  const { groupId, memberId } = req.body;

  const group = await groupModel.findById(groupId);

  if (!group) {
    return res.status(404).json({ message: 'Group not found' });
  }

  if (!group.members.includes(req.user.id)) {
    return res.status(403).json({ message: 'Not a group member' });
  }

  
  await groupModel.addMember(groupId, memberId);

  res.json({ message: 'Member added successfully' });
  } catch (error) {
  res.status(500).json({ message: 'Failed to add member' });
  }
};

exports.getMyGroups = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const groupModel = new GroupModel(db);

    const groups = await groupModel.findGroupsByUser(req.user.id);

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch groups' });
  }
};
