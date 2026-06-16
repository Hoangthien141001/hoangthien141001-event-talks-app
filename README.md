# BigQuery Release Notes App

A lightweight, modern web application built with Python (Flask) and Vanilla JavaScript that fetches and beautifully displays the latest release notes for Google BigQuery.

## Features

- **Live Feed Aggregation**: Automatically fetches the latest release notes from the official Google BigQuery XML feed.
- **Modern UI**: A responsive, dark-themed interface built with glassmorphism effects and smooth animations.
- **Dynamic Loading**: Fetches updates asynchronously without requiring a full page reload.
- **Social Sharing**: One-click sharing of specific release notes via Twitter.

## Project Structure

- **`app.py`**: The Flask backend server that serves the UI and proxies the XML feed.
- **`templates/index.html`**: The main frontend interface containing HTML structure, embedded CSS, and JavaScript logic.
- **`requirements.txt`**: Python dependencies required to run the application.
- **`static/`**: Contains unused or older static assets (`script.js`, `style.css`).

## Prerequisites

- Python 3.x
- pip (Python package installer)

## Setup and Installation

1. **Clone the repository** (or navigate to your project directory):
   ```bash
   git clone https://github.com/Hoangthien141001/hoangthien141001-event-talks-app.git
   cd hoangthien141001-event-talks-app
   ```

2. **Create a virtual environment (optional but recommended)**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install the required dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   python app.py
   ```

5. **View the app**:
   Open your browser and navigate to `http://localhost:5000`.

## Architecture Overview

- **Backend**: The Flask server exposes a single API endpoint (`/api/notes`) which fetches the XML feed using `feedparser`, parses it into JSON, and returns it. This bypasses client-side CORS issues.
- **Frontend**: The vanilla JavaScript client requests the JSON data from the backend API, formats the dates, generates Twitter intent URLs, and dynamically populates the DOM.

## License

This project is open-source and available for use and modification.
