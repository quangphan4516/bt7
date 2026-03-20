const http = require('http');

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: data
        });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function testAPI() {
  console.log('=== Testing User API ===\n');

  // Test 1: Get all users
  console.log('1. GET /api/v1/users');
  try {
    const res1 = await makeRequest('GET', '/api/v1/users');
    console.log('Status:', res1.status);
    console.log('Response:', res1.body);
    console.log('');
  } catch (err) {
    console.log('Error:', err.message);
  }

  // Test 2: Create new user
  console.log('2. POST /api/v1/users (Create new user)');
  try {
    const res2 = await makeRequest('POST', '/api/v1/users', {
      username: 'john',
      password: 'john123',
      email: 'john@example.com',
      fullName: 'John Doe',
      role: 2
    });
    console.log('Status:', res2.status);
    console.log('Response:', res2.body);
    console.log('');
  } catch (err) {
    console.log('Error:', err.message);
  }

  // Test 3: Get user by id
  console.log('3. GET /api/v1/users/1');
  try {
    const res3 = await makeRequest('GET', '/api/v1/users/1');
    console.log('Status:', res3.status);
    console.log('Response:', res3.body);
    console.log('');
  } catch (err) {
    console.log('Error:', err.message);
  }

  // Test 4: Enable user
  console.log('4. POST /api/v1/users/enable');
  try {
    const res4 = await makeRequest('POST', '/api/v1/users/enable', {
      username: 'admin',
      email: 'admin@example.com'
    });
    console.log('Status:', res4.status);
    console.log('Response:', res4.body);
    console.log('');
  } catch (err) {
    console.log('Error:', err.message);
  }

  // Test 5: Disable user
  console.log('5. POST /api/v1/users/disable');
  try {
    const res5 = await makeRequest('POST', '/api/v1/users/disable', {
      username: 'admin',
      email: 'admin@example.com'
    });
    console.log('Status:', res5.status);
    console.log('Response:', res5.body);
    console.log('');
  } catch (err) {
    console.log('Error:', err.message);
  }

  // Test 6: Get all roles
  console.log('6. GET /api/v1/roles');
  try {
    const res6 = await makeRequest('GET', '/api/v1/roles');
    console.log('Status:', res6.status);
    console.log('Response:', res6.body);
    console.log('');
  } catch (err) {
    console.log('Error:', err.message);
  }

  // Test 7: Create new role
  console.log('7. POST /api/v1/roles (Create new role)');
  try {
    const res7 = await makeRequest('POST', '/api/v1/roles', {
      name: 'Moderator',
      description: 'Moderator role'
    });
    console.log('Status:', res7.status);
    console.log('Response:', res7.body);
    console.log('');
  } catch (err) {
    console.log('Error:', err.message);
  }
}

testAPI();
