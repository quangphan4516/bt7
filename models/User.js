const db = require('./db');

class User {
  static create(data) {
    // Check unique username và email
    const existUser = db.users.find(
      u => (u.username === data.username || u.email === data.email) && !u.isDeleted
    );
    if (existUser) {
      return { error: 'Username or email already exists' };
    }

    const newUser = {
      _id: db.userIdCounter++,
      username: data.username,
      password: data.password,
      email: data.email,
      fullName: data.fullName || '',
      avatarUrl: data.avatarUrl || 'https://i.sstatic.net/l60Hf.png',
      status: data.status || false,
      role: data.role || null,
      loginCount: data.loginCount || 0,
      isDeleted: false,
      timestamp: new Date()
    };
    db.users.push(newUser);
    return newUser;
  }

  static getAll() {
    return db.users.filter(user => !user.isDeleted);
  }

  static getById(id) {
    return db.users.find(user => user._id === id && !user.isDeleted);
  }

  static update(id, data) {
    const user = this.getById(id);
    if (user) {
      if (data.username) user.username = data.username;
      if (data.password) user.password = data.password;
      if (data.email) user.email = data.email;
      if (data.fullName !== undefined) user.fullName = data.fullName;
      if (data.avatarUrl !== undefined) user.avatarUrl = data.avatarUrl;
      if (data.status !== undefined) user.status = data.status;
      if (data.role !== undefined) user.role = data.role;
      if (data.loginCount !== undefined) user.loginCount = data.loginCount;
      user.timestamp = new Date();
      return user;
    }
    return null;
  }

  static delete(id) {
    const user = db.users.find(u => u._id === id);
    if (user) {
      user.isDeleted = true;
      return true;
    }
    return false;
  }

  static findByUsername(username) {
    return db.users.find(user => user.username === username && !user.isDeleted);
  }

  static findByEmail(email) {
    return db.users.find(user => user.email === email && !user.isDeleted);
  }

  static findByUsernameAndEmail(username, email) {
    return db.users.find(
      user => user.username === username && user.email === email && !user.isDeleted
    );
  }

  static enable(username, email) {
    const user = this.findByUsernameAndEmail(username, email);
    if (user) {
      user.status = true;
      user.timestamp = new Date();
      return user;
    }
    return null;
  }

  static disable(username, email) {
    const user = this.findByUsernameAndEmail(username, email);
    if (user) {
      user.status = false;
      user.timestamp = new Date();
      return user;
    }
    return null;
  }

  static changePassword(id, oldPassword, newPassword) {
    const user = this.getById(id);
    if (!user) {
      return { error: 'User not found' };
    }
    if (user.password !== oldPassword) {
      return { error: 'Incorrect old password' };
    }
    user.password = newPassword;
    user.timestamp = new Date();
    return user;
  }
}

module.exports = User;
