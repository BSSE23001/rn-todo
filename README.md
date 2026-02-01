# RN-Todo: A React Native Todo Application with Convex Backend

This is a simple yet feature-rich Todo application built with React Native and Expo. It uses Convex as a backend for real-time data synchronization.

## Features

- **Cross-Platform:** Runs on Android, iOS, and Web.
- **Real-time Database:** Powered by Convex for real-time data synchronization.
- **CRUD Operations:** Create, Read, Update, and Delete todos.
- **Toggle Completion:** Mark todos as completed or incomplete.
- **Edit Todos:** In-place editing of existing todos.
- **Clear All:** A feature to delete all todos at once.
- **Theming:** Supports both light and dark themes.
- **Empty State:** A clean UI for when there are no todos.
- **Modern UI:** Built with modern and intuitive UI components.

## Technologies Used

- **Frontend:**
  - React Native
  - Expo
  - TypeScript
  - React Navigation
- **Backend:**
  - Convex
- **Linting:**
  - ESLint

## Prerequisites

- Node.js (v18 or higher)
- npm
- Expo CLI
- A Convex account

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/BSSE23001/rn-todo.git
    cd rn-todo
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Convex:**

    - Install the Convex CLI:

      ```bash
      npm install -g convex
      ```

    - Log in to your Convex account:

      ```bash
      npx convex login
      ```

    - Initialize Convex in your project:

      ```bash
      npx convex init
      ```

    - Follow the on-screen instructions to create a new project.
    - Deploy the backend functions and schema:

      ```bash
      npx convex deploy
      ```
    - The previous command will create a `convex/_generated/api.js` file with your project's API. The app is already set up to use this.


## Running the Application

You can start the development server and then choose the platform from the Expo Dev Tools.

```bash
npx expo start
```

## Project Structure

```
.
├── app/                # Main application source code
│   ├── (tabs)/         # Tab navigator screens
│   └── _layout.tsx     # Root layout
├── assets/             # Images, fonts, and styles
├── components/         # Reusable React components
├── convex/             # Convex backend schema and functions
├── hooks/              # Custom React hooks
├── app.json            # Expo configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```