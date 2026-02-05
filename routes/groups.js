const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/groupController');

router.post('/', auth, controller.createGroup);
router.post('/add-member', auth, controller.addMember);
router.get('/', auth, controller.getMyGroups);

module.exports = router;
