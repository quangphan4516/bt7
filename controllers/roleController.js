const Role = require('../models/Role');

// GET all roles
exports.getAllRoles = (req, res) => {
  try {
    const roles = Role.getAll();
    res.json({
      status: 'success',
      data: roles,
      message: 'Get all roles successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// GET role by id
exports.getRoleById = (req, res) => {
  try {
    const { id } = req.params;
    const role = Role.getById(parseInt(id));

    if (!role) {
      return res.status(404).json({
        status: 'error',
        message: 'Role not found'
      });
    }

    res.json({
      status: 'success',
      data: role,
      message: 'Get role successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// CREATE new role
exports.createRole = (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        status: 'error',
        message: 'Name is required'
      });
    }

    // Check if role name already exists
    const existRole = Role.findByName(name);
    if (existRole) {
      return res.status(400).json({
        status: 'error',
        message: 'Role name already exists'
      });
    }

    const newRole = Role.create({
      name,
      description
    });

    res.status(201).json({
      status: 'success',
      data: newRole,
      message: 'Role created successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// UPDATE role
exports.updateRole = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRole = Role.update(parseInt(id), updateData);

    if (!updatedRole) {
      return res.status(404).json({
        status: 'error',
        message: 'Role not found'
      });
    }

    res.json({
      status: 'success',
      data: updatedRole,
      message: 'Role updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// DELETE role (soft delete)
exports.deleteRole = (req, res) => {
  try {
    const { id } = req.params;

    const deleted = Role.delete(parseInt(id));

    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Role not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Role deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
