/**
 * Validate URL
 * @param {string} url
 * @returns {boolean}
 */
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Validate Date as DD/MM/YYYY
 * @param {string} dateString
 * @returns {boolean}
 */
export function isValidDate(dateString) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * Validate Quotation data
 * @param {Object} quotation
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export function validateQuotation(quotation) {
  const errors = [];

  // Company validation
  if (!quotation.company.name) errors.push("Company name is required.");
  if (!quotation.company.email) errors.push("Company email is required.");
  if (!quotation.company.address) errors.push("Company address is required.");
  if (quotation.company.logo && !isValidURL(quotation.company.logo)) {
    errors.push("Company logo URL is invalid.");
  }

  // Customer validation
  if (!quotation.customer.name) errors.push("Customer name is required.");

  // Line items validation
  if (!quotation.lineItems || quotation.lineItems.length === 0) {
    errors.push("At least one line item is required.");
  } else {
    quotation.lineItems.forEach((item, index) => {
      if (typeof item.qty !== 'number' || isNaN(item.qty) || item.qty <= 0) {
        errors.push(`Line item ${index + 1} must have a valid quantity greater than 0.`);
      }
      if (typeof item.unitPrice !== 'number' || isNaN(item.unitPrice) || item.unitPrice < 0) {
        errors.push(`Line item ${index + 1} must have a valid unit price >= 0.`);
      }
      if (!item.description) {
        errors.push(`Line item ${index + 1} must have a description.`);
      }
    });
  }

  // Date validation
  if (!isValidDate(quotation.date)) {
    errors.push("Date must be in DD/MM/YYYY format and be a valid date.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
