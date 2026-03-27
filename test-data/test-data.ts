/**
 * Test Data
 *
 * This file contains static test data that can be used across tests
 */

export const generateRandomUser = () => {
  const random = Math.floor(Math.random() * 10000);

  return {
    firstName: `John${random}`,
    lastName: `Doe${random}`,
    email: `john.doe${random}@gmail.com`,
    phone: `06${Math.floor(10000000 + Math.random() * 90000000)}`,
    website: `https://test${random}.com`,
    message: 'Interested in your solution',
  };
};

export const testUsers = {
  admin: {
    email: 'admin@example.com',
    password: 'AdminPass123',
    role: 'admin',
    name: 'Admin User',
  },

  regularUser: {
    email: 'user@example.com',
    password: 'UserPass123',
    role: 'user',
    name: 'Regular User',
  },

  viewer: {
    email: 'viewer@example.com',
    password: 'ViewerPass123',
    role: 'viewer',
    name: 'Viewer User',
  },
};

export const testProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 29.99,
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 49.99,
    category: 'Books',
    inStock: true,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 19.99,
    category: 'Clothing',
    inStock: false,
  },
];

export const invalidEmails = ['invalid-email', '@example.com', 'user@', 'user @example.com', ''];

export const validEmails = ['user@example.com', 'test.user@example.co.uk', 'john+test@company.com'];
