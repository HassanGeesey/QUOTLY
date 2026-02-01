import test from 'node:test';
import assert from 'node:assert';
import { isValidURL, isValidDate, validateQuotation } from './src/validation.js';

test('isValidURL validates correctly', () => {
  assert.strictEqual(isValidURL('https://example.com/logo.png'), true);
  assert.strictEqual(isValidURL('invalid-url'), false);
});

test('isValidDate validates correctly', () => {
  assert.strictEqual(isValidDate('01/01/2023'), true);
  assert.strictEqual(isValidDate('32/01/2023'), false);
  assert.strictEqual(isValidDate('01/13/2023'), false);
  assert.strictEqual(isValidDate('2023-01-01'), false);
});

test('validateQuotation catches missing data', () => {
  const incompleteQuotation = {
    company: { name: '', email: '', address: '' },
    customer: { name: '' },
    lineItems: [
      { qty: 'invalid', unitPrice: -1, description: '' }
    ],
    date: 'invalid'
  };

  const result = validateQuotation(incompleteQuotation);
  assert.strictEqual(result.isValid, false);
  assert.ok(result.errors.length > 0);
});

test('validateQuotation passes valid data', () => {
  const validQuotation = {
    company: {
      name: 'Test Co',
      email: 'test@test.com',
      address: '123 St',
      logo: 'https://example.com/logo.png'
    },
    customer: { name: 'John Doe' },
    lineItems: [
      { qty: 1, unitPrice: 10, description: 'Service' }
    ],
    date: '15/10/2023'
  };

  const result = validateQuotation(validQuotation);
  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.errors.length, 0);
});
