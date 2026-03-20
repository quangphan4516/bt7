// In-memory database for User và Role
let roleIdCounter = 1;
let userIdCounter = 1;

const database = {
  roles: [
    {
      _id: roleIdCounter++,
      name: 'Admin',
      description: 'Administrator role',
      timestamp: new Date()
    },
    {
      _id: roleIdCounter++,
      name: 'User',
      description: 'Regular user role',
      timestamp: new Date()
    }
  ],
  users: [
    {
      _id: userIdCounter++,
      username: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
      fullName: 'Administrator',
      avatarUrl: 'https://i.sstatic.net/l60Hf.png',
      status: true,
      role: 1,
      loginCount: 5,
      isDeleted: false,
      timestamp: new Date()
    },
    {
      _id: userIdCounter++,
      username: 'bo',
      password: '456',
      email: 'bo123@example.com',
      fullName: 'User Bo',
      avatarUrl: 'https://i.sstatic.net/l60Hf.png',
      status: true,
      role: 2,
      loginCount: 0,
      isDeleted: false,
      timestamp: new Date()
    }
  ],
  roleIdCounter,
  userIdCounter
};

module.exports = database;
