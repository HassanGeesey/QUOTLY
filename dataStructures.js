// Company Info
export const company = {
  logo: "IMAGE_URL",
  name: "COMPANY_NAME",
  email: "EMAIL",
  address: "ADDRESS",
  mobiles: ["PHONE_1", "PHONE_2"],
  landline: "LANDLINE",
};

// Customer Info
export const customer = {
  name: "CUSTOMER_NAME",
};

// Line Items
export const lineItems = [
  {
    no: 1,
    qty: 0,
    unit: "UNIT",
    unitPrice: 0,
    description: "DESCRIPTION",
    total: "0.00",
  },
];

// Quotation
export const quotation = {
  date: "DD/MM/YYYY",
  company,
  customer,
  lineItems,
  grandTotal: "0.00",
};
