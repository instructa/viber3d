# Contributing to viber3d

Thank you for your interest in contributing to viber3d! This document provides guidelines and instructions to help you get started with contributing to the project.


## Getting Started

### Development Environment Setup

1. **Fork the Repository**
   
   Start by forking the repository to your GitHub account.

2. **Clone the Repository**

   ```bash
   git clone git@github.com:instructa/viber3d.git
   cd viber3d
   ```

3. **Install Dependencies & Run**

    ```bash
      # Using npm
      pnpm install
      pnpm run dev
    ```

   The development server will start at `http://localhost:5173`.

## Development Workflow

1. **Create a Branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make Your Changes**

   Implement your changes.

3. **Commit Your Changes**

   ```bash
   git commit -m "feat: add your feature description"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

4. **Push to Your Fork**

   ```bash
   git push origin feat/your-feature-name
   ```

5. **Create a Pull Request**

   Go to the [viber3d repository](https://github.com/instructa/viber3d) and create a pull request from your fork.

## Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update documentation if necessary
3. Add tests for new features
4. Make sure all tests pass
5. Wait for code review and address any feedback