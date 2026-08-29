# Contributing to Ledger CRM

Thank you for your interest in contributing to Ledger CRM! This document
provides guidelines and instructions for contributing.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/ledger-crm.git
   cd ledger-crm
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/my-feature
   ```

## Development Workflow

### Running the App

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Code Style

- We use **React 18** with functional components and hooks.
- **Tailwind CSS** is used for styling — avoid writing custom CSS unless
  absolutely necessary.
- Keep components small and focused on a single responsibility.
- Use descriptive variable and function names.

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/)
specification:

- `feat:` — a new feature
- `fix:` — a bug fix
- `docs:` — documentation-only changes
- `style:` — formatting, missing semicolons, etc. (no code change)
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `test:` — adding or updating tests
- `chore:` — build process or auxiliary tool changes

**Examples:**

```
feat: add contact search by email
fix: correct deal total calculation on dashboard
docs: update README with Docker instructions
test: add unit tests for CSV export
```

## Pull Request Process

1. Ensure your branch is up to date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. Run the full test suite and ensure all tests pass:
   ```bash
   npm test
   ```
3. Push your branch and open a pull request against `main`.
4. Fill in the PR template with a clear description of your changes.
5. Request review from at least one maintainer.

## Reporting Bugs

When filing a bug report, please include:

- A clear, descriptive title.
- Steps to reproduce the issue.
- Expected behavior vs. actual behavior.
- Browser and OS version.
- Screenshots or recordings if applicable.

## Requesting Features

Feature requests are welcome! Please include:

- A clear description of the problem your feature solves.
- Any proposed API or UI designs.
- Whether you're willing to implement it yourself.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the
same terms as the project.
