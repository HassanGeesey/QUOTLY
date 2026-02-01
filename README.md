# Quotly Master Pro - React Native Edition

Quotly is a mobile application built with React Native for generating professional quotation PDFs using the [pdfgen.app](https://pdfgen.app) API.

## Features

- **Dynamic Line Items**: Add, edit, and remove line items with automatic total calculations.
- **Company & Customer Info**: Manage contact details and logos.
- **PDF Generation**: Direct integration with pdfgen.app API.
- **Validation**: Built-in validation for dates, URLs, and required fields.
- **Offline Ready**: Modular logic designed to work offline.

## Prerequisites

Before running the app, ensure you have the following installed on your laptop:

- **Node.js** (v18 or newer recommended)
- **npm** or **yarn**
- **React Native Development Environment**:
  - For iOS: macOS with Xcode installed.
  - For Android: Android Studio and Android SDK.
  - Alternatively, you can use **Expo Go** for quicker testing.

## Getting Started

### 1. Clone and Install Dependencies

```bash
# Navigate to the project directory
npm install
```

### 2. Run the App

#### Using React Native CLI
```bash
# Start the Metro bundler
npm start

# In a new terminal, run on Android
npm run android

# Or run on iOS
npm run ios
```

#### Using Expo (Recommended for quick start)
If you prefer Expo, you can initialize an Expo project and copy the `src` and `App.js` files into it.

### 3. Running Tests

The project includes unit tests for business logic and validation.

```bash
npm test
```

## Project Structure

- `App.js`: Main UI component and state management.
- `src/orchestrator.js`: Main entry point for business logic orchestration.
- `src/logic.js`: Calculation logic for totals and line items.
- `src/api.js`: API service for PDF generation.
- `src/validation.js`: Data validation rules.
- `src/dataStructures.js`: Initial state and data schemas.
- `src/components/`: Reusable UI components (`FormField`, `LineItemRow`).

## API Configuration

The app is pre-configured with the following credentials:
- **Template ID**: `fa5790d`
- **API Key**: `lCi76rUCD3onQBnGIifE7`

These are located in `src/api.js`.

## Extensibility

The project is designed to be easily extended with:
- Tax support
- Discounts
- Currency selection
- Multiple PDF templates

Check `src/orchestrator.js` for extensibility placeholders.
