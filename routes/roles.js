var express = require('express');
var router = express.Router();
const roleController = require('../controllers/roleController');

// GET all roles
router.get('/', roleController.getAllRoles);

// GET role by id
router.get('/:id', roleController.getRoleById);

// CREATE new role
router.post('/', roleController.createRole);

// UPDATE role
router.put('/:id', roleController.updateRole);

// DELETE role (soft delete)
router.delete('/:id', roleController.deleteRole);

module.exports = router;
