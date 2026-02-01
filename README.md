# Quotly Master Pro - React Native Edition (Expo Version)

Quotly is a mobile application for generating professional quotation PDFs using the [pdfgen.app](https://pdfgen.app) API.

## Why Expo?

If you encountered an error saying **"Android project not found"**, it's because a standard React Native project requires a native `android` folder which is complex to set up manually.

We have switched this project to **Expo**. Expo allows you to run the app on your phone without needing native Android or iOS folders, making it much easier to start on your laptop.

## Prerequisites

- **Node.js** (v18 or newer)
- **Expo Go App** (Download it on your iPhone or Android phone from the App Store/Play Store)

## Getting Started

### 1. Install Dependencies

On your laptop, run:
```bash
npm install
```

### 2. Start the Project

Run:
```bash
npm start
```
This will start the Expo development server and display a **QR Code** in your terminal.

### 3. Run on your Phone

1. Open the **Expo Go** app on your phone.
2. Scan the QR code shown in your laptop's terminal.
3. The app will load and you can start generating quotations!

## Running Tests

You can still run the business logic tests on your laptop:
```bash
npm test
```

## Features

- **Dynamic Line Items**: Real-time total calculations.
- **Validation**: Ensures dates, URLs, and required fields are correct.
- **PDF Generation**: Sends data to pdfgen.app and receives the PDF.

## Troubleshooting

If you still want to run the app using `npm run android` with the native CLI, you would need to run `npx expo prebuild` first to generate the `android` folder, but we recommend sticking with **Expo Go** for the simplest experience.
