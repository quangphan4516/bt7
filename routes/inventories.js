var express = require('express');
var router = express.Router();
var inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getAll);
router.get('/:id', inventoryController.getById);
router.post('/add-stock', inventoryController.addStock);
router.post('/remove-stock', inventoryController.removeStock);
router.post('/reservation', inventoryController.reservation);
router.post('/sold', inventoryController.sold);

module.exports = router;
