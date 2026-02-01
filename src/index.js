import { updateLineItemsTotals, calculateGrandTotal } from './logic.js';
import { validateQuotation } from './validation.js';
import { generatePDF } from './api.js';

/**
 * Main function to handle quotation processing based on selected mode.
 * @param {Object} rawQuotation - The raw quotation data.
 * @param {string} mode - Mode A, B, or C.
 * @returns {Promise<any>}
 */
export async function processQuotation(rawQuotation, mode = 'A') {
  // Step 1: Update line items totals and numbers (Usage Flow)
  const updatedLineItems = updateLineItemsTotals(rawQuotation.lineItems);

  // Step 2: Calculate grand total (Usage Flow)
  const grandTotal = calculateGrandTotal(updatedLineItems);

  const quotation = {
    ...rawQuotation,
    lineItems: updatedLineItems,
    grandTotal: grandTotal,
  };

  switch (mode) {
    case 'A': // Mode A: Return JSON for debugging
      return quotation;

    case 'B': // Mode B: Call API to generate PDF
      const validationB = validateQuotation(quotation);
      if (!validationB.isValid) {
        throw new Error("Validation failed: " + validationB.errors.join(", "));
      }
      return await generatePDF(quotation);

    case 'C': // Mode C: Validate & review totals, line items, errors
      const validationC = validateQuotation(quotation);
      return {
        quotation,
        validation: validationC,
      };

    default:
      throw new Error("Invalid mode selected.");
  }
}

/**
 * EXTENSIBILITY PLACEHOLDERS
 */

// TODO: Add support for taxes
export function applyTax(quotation, taxPercentage) {
  // Logic to apply tax to grandTotal
  return quotation;
}

// TODO: Add support for discounts
export function applyDiscount(quotation, discountAmount) {
  // Logic to subtract discount from grandTotal
  return quotation;
}

// TODO: Add currency support
export function setCurrency(quotation, currencyCode) {
  // Logic to set currency symbol and format
  return quotation;
}

// TODO: Add template switching
export function switchTemplate(templateId) {
  // Logic to update templateId for API calls
}
