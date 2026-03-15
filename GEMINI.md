# GEMINI.md

## Project Overview

This project is a simple, single-page web application named "Dev&Dash". Its primary purpose is to display details for an "Autumn Event" and allow users to register for it. The application is built with plain HTML, CSS, and JavaScript, without any external frameworks or libraries.

The frontend communicates with a backend API for functionalities like:
*   Fetching event details.
*   User authentication via Google Sign-In.
*   Event registration, including a simulated payment process for paid events.

## Building and Running

There are no build steps required for this project. To run the application, simply open the `index.html` file in a web browser.

**Note:** The application relies on a backend service. Ensure the backend is running and accessible at the configured URL: `https://independent-irita-clubspot-9e43f2fa.koyeb.app/api`.

## Development Conventions

### Code Style

*   The project uses plain JavaScript (ES6+), HTML, and CSS.
*   The JavaScript code is organized into a single `script.js` file and an API communication module in `module-backend/gigbycity@apiCall.js`.
*   The `FidaAPI` object in `module-backend/gigbycity@apiCall.js` encapsulates all communication with the backend API.

### Authentication

*   Authentication is handled via Google Sign-In. The Google Client ID is fetched from the backend.
*   An authentication token is stored in `localStorage` to maintain the user's session.

### API Communication

*   All backend communication is managed through the `FidaAPI` object.
*   The base URL for the API is hardcoded in `module-backend/gigbycity@apiCall.js`.

### TODO

*   The `package.json` file is very basic. Consider adding dependencies like a development server (e.g., `live-server`) for easier development.
*   The `test` script in `package.json` is a placeholder. If testing is desired, a testing framework like Jest or Mocha could be integrated.
*   The Google Client ID is hardcoded in the script, though it is fetched from the backend. For better security and configuration, this should be managed through environment variables.
