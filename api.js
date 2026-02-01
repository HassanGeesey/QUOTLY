const TEMPLATE_ID = "fa5790d";
const API_KEY = "lCi76rUCD3onQBnGIifE7";

/**
 * Generate PDF via pdfgen.app API
 * @param {Object} quotation
 * @returns {Promise<Blob>}
 */
export async function generatePDF(quotation) {
  const response = await fetch(
    `https://pdfgen.app/api/generate?templateId=${TEMPLATE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api_key": API_KEY,
      },
      body: JSON.stringify({ data: quotation }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate PDF: ${response.statusText} - ${errorText}`);
  }

  // In React Native, you would handle the blob or use a library to save/share it.
  // For example, using react-native-fs to save to a local path.
  const blob = await response.blob();
  return blob;
}
