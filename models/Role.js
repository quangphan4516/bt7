const db = require('./db');

class Role {
  static create(data) {
    const newRole = {
      _id: db.roleIdCounter++,
      name: data.name,
      description: data.description || '',
      timestamp: new Date()
    };
    db.roles.push(newRole);
    return newRole;
  }

  static getAll() {
    return db.roles.filter(role => !role.isDeleted);
  }

  static getById(id) {
    return db.roles.find(role => role._id === id && !role.isDeleted);
  }

  static update(id, data) {
    const role = this.getById(id);
    if (role) {
      if (data.name) role.name = data.name;
      if (data.description !== undefined) role.description = data.description;
      role.timestamp = new Date();
      return role;
    }
    return null;
  }

  static delete(id) {
    const role = db.roles.find(r => r._id === id);
    if (role) {
      role.isDeleted = true;
      return true;
    }
    return false;
  }

  static findByName(name) {
    return db.roles.find(role => role.name === name && !role.isDeleted);
  }
}

module.exports = Role;
