# Conscious Crave

Conscious Crave is a web application that provides AI-powered food analysis to help users make informed dietary choices. It uses the OpenAI API to analyze food products and provide a detailed breakdown of their ingredients, nutritional value, and potential health concerns.

## Features

-   **Product Analysis:** Get a detailed analysis of any food product by searching for it or scanning its barcode.
-   **Generative Follow-ups:** Get AI-generated follow-up questions to learn more about a product.
-   **Secure Backend:** All API calls to OpenAI are handled by a secure backend proxy to protect your API key.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/conscious-crave.git
    cd conscious-crave
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a `.env` file in the root of the project and add your OpenAI API key:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```

5.  **Open the application:**
    Open `index.html` in your browser to use the application.

## Project Structure

-   `index.html`: The main frontend file for the application.
-   `server.js`: The backend proxy server that handles all API calls to OpenAI.
-   `package.json`: The project's dependencies and scripts.
-   `.env`: The file where you store your OpenAI API key.
-   `.gitignore`: The file that tells Git which files to ignore.
