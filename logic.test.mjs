import test from 'node:test';
import assert from 'node:assert';
import { calculateLineTotal, updateLineItemsTotals, calculateGrandTotal } from './src/logic.js';

test('calculateLineTotal calculates correctly', () => {
  const item = { qty: 2, unitPrice: 10.5 };
  assert.strictEqual(calculateLineTotal(item), "21.00");
});

test('updateLineItemsTotals updates all items', () => {
  const items = [
    { qty: 1, unitPrice: 10, description: 'Item 1' },
    { qty: 2, unitPrice: 5, description: 'Item 2' }
  ];
  const updated = updateLineItemsTotals(items);

  assert.strictEqual(updated[0].no, 1);
  assert.strictEqual(updated[0].total, "10.00");
  assert.strictEqual(updated[1].no, 2);
  assert.strictEqual(updated[1].total, "10.00");
});

test('calculateGrandTotal calculates correctly', () => {
  const items = [
    { total: "10.00" },
    { total: "25.50" },
    { total: "5.25" }
  ];
  assert.strictEqual(calculateGrandTotal(items), "40.75");
});
