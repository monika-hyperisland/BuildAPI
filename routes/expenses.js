const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/expenseController');

router.post('/', auth, controller.addExpense);
router.get('/:groupId', auth, controller.getGroupExpenses);
router.delete('/:expenseId', auth, controller.deleteExpense);


module.exports = router;
