# Checklist System

A Node.js application that evaluates application conditions based on provided criteria. The system fetches application data from an API and displays results in a dashboard showing which conditions have passed or failed.

## Table of Contents

- [Checklist System](#checklist-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Architecture](#architecture)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Project Structure](#project-structure)
  - [API Documentation](#api-documentation)
    - [GET /api/checklist/:applicationId](#get-apichecklistapplicationid)
  - [Development Guidelines](#development-guidelines)
    - [Adding New Rules](#adding-new-rules)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Evaluates multiple conditions as per application requirements:
  - Valuation Fee Payment Status
  - UK Residency Check
  - Risk Rating Assessment
  - Loan-to-Value (LTV) Calculation
- Real-time data fetching from external API
- Interactive dashboard display
- Modular and extensible rule engine
- Error handling and logging

## Technology Stack

### Backend

- Node.js
- TypeScript
- Express.js
- Winston (logging)
- Axios (HTTP client)

### Frontend

- React
- Vite
- TypeScript
- Axios

## Architecture

The application follows a modular architecture:

```bash
Backend                          Frontend
┌──────────────┐                ┌──────────────┐
│  Controller  │                │   React UI   │
└──────┬───────┘                └──────┬───────┘
       │                               │
┌──────┴───────┐                ┌──────┴───────┐
│ Rule Engine  │                │  API Client  │
└──────┬───────┘                └──────┬───────┘
       │                               │
┌──────┴───────┐                       │
│    Rules     │                       │
└──────┬───────┘                       │
       │                               │
┌──────┴───────┐                       │
│  Services    │ ←──── HTTP/REST ──────┘
└──────────────┘
```

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd checklist-system
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

4. Configure environment variables:

   Backend (.env):

   ```env
   PORT=3000
   NODE_ENV=development
   API_BASE_URL=http://qa-gb.api.dynamatix.com:3100/api
   ```

   Frontend (.env):

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

Access the application at <http://localhost:5173>

## Project Structure

```bash
    checklist-system/
    ├── backend/
    │   ├── src/
    │   │   ├── config/
    │   │   ├── controllers/
    │   │   ├── engine/
    │   │   ├── middleware/
    │   │   ├── rules/
    │   │   ├── services/
    │   │   ├── types/
    │   │   ├── utils/
    │   │   └── app.ts
    │   └── package.json
    │
    └── frontend/
        ├── src/
        │   ├── components/
        │   ├── services/
        │   ├── types/
        │   └── App.tsx
        └── package.json
```

## API Documentation

### GET /api/checklist/:applicationId

Evaluates checklist rules for a given application.

Response format:

```typescript
interface RuleResult {
  ruleName: string;
  passed: boolean;
  message: string;
}
```

Example response:

```json
[
  {
    "ruleName": "Valuation Fee Paid",
    "passed": true,
    "message": "Valuation fee has been paid"
  },
  {
    "ruleName": "UK Resident",
    "passed": true,
    "message": "Applicant is a UK resident"
  },
  {
    "ruleName": "Risk Rating",
    "passed": true,
    "message": "Risk rating is Medium"
  },
  {
    "ruleName": "LTV Check",
    "passed": true,
    "message": "LTV 57.14% is below 60%"
  }
]
```

## Development Guidelines

### Adding New Rules

1. Create a new rule class in `backend/src/rules/implementations/`:

   ```typescript
   export class NewRule implements Rule {
     evaluate(data: ApplicationData): RuleResult {
       // Implementation
     }
   }
   ```

2. Register the rule in `backend/src/app.ts`:

   ```typescript
   ruleEngine.addRule(new NewRule());
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)
