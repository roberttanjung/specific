# Copilot Instructions

## Introduction

SPEcific is a App Web that is used to automate the work process of Leaders such as: profiling, roadmap, KPI, form / performance review, and performance appraisal.

## List of Divisions

- IT Development
- HCGA
- Product Development
- Research & Development
- IT Infrastructure, Network, and Security
- Business & Relationship
- FAT
- Compliance & Audit
- BOD/Management

## Sections

### Similar

- Bio
- Profile Aspects
- Strengths
- Areas for Improvement
- Roadmap: The stages that must be passed in the form of a Gantt Chart.

### Different

- Activity
- Bare Minimum
- Performance

#### Activity

- IT Development: SPEctrum, Click Up, and GitLab

## Tech Stack

- **Next JS v16**: Primary Framework for building web applications.
- **TypeScript**: Programming language used to improve code quality.
- **ESLint**: Tool to ensure code consistency.
- **Prettier**: Tool to ensure consistent code formatting.
- **Jest**: Framework for unit testing.
- **React Testing Library**: Tool for testing React components.
- **Storybook**: Tool for developing and documenting UI components.
- **React Hook Form**: Library for managing forms in React applications.
- **Yup**: Library for data schema validation.
- **Axios**: Library for making HTTP requests.
- **SWR**: Library for data fetching.
- **MongoDB**: NoSQL database used to store application data.
- **Mongoose**: Library for modeling MongoDB data in Node.js applications.
- **Docker**: Platform for developing, shipping, and running applications in containers.
- **Express**: Framework for building backend APIs.
- **cron**: Tool for scheduling automated tasks, such as daily data synchronization.

## Source Data

- SPEInside: Retrieves session data such as position, division, and department
- Click Up
- GitLab
- SPEctrum

## Rules

- All Source Data will be stored in the DB and synchronized daily at 00:00
- Each division has different KPIs
- Each division has departments with different Bare Minimums
- Data can be filtered by year to view the historical development of team members
- Activity source data varies for each division:
  - Users can fill in activities independently
  - IT Development: SPEctrum, Click Up, and GitLab

## Features

- Has a feature to change the writing format to be more consistent and easier to read.
- Dark Mode to provide a more comfortable user experience, especially when working in low light conditions.
- Can create KPIs dynamically according to the needs of the division or department.
- Can create Bare Minimums dynamically according to the needs of the division or department.

## User Status

- 0: Inactive / Deleted
- 1: The Division nor The Department isn't assigned yet
- 2: Active

## Roles

- Superadmin: Has access to all features.

## Access

- Head:
  - Can create KPIs
  - Can create Bare Minimums
- SPV:
  - Can fill in KPIs
  - Can fill in Bare Minimums

## Structure

- `src/app`: Main folder for pages
- `src/components`: Folder for reusable UI components
- `src/utils`: Folder for utilities and helper functions that can be used in various places
- `src/views`: Folder for components specific to certain pages for better organization

## Style Guide

- Use camelCase for variable and function names
- Use PascalCase for React component names
- Follow the single responsibility principle for components, ensuring each component has only one responsibility
- Avoid deeply nested components, try to break them into smaller components if necessary
- Nested hanya 1 level, jika lebih dari itu, pertimbangkan untuk memecahnya menjadi komponen yang lebih kecil

### Example

#### Folder Structure

src/
├── app/
│ ├── dashboard/
│ │ ├── page.tsx
│ └── profile/
│ | ├── page.tsx
├── views/
│ ├── Dashboard/
│ │ ├── DashboardCard.tsx
│ │ ├── Dashboard.module.css
│ │ ├── Dashboard.types.ts
│ │ └── index.ts
│ └── Profile/
│ ├── ProfileIntro.tsx
│ ├── ProfileDetails.tsx
│ ├── Profile.module.css
│ ├── Profile.types.ts
│ └── index.ts
├── components/
│ ├── Button/
│ │ ├── ButtonHide.tsx
│ │ ├── ButtonShow.tsx
│ │ ├── Button.module.css
│ │ ├── Button.types.ts
│ │ └── index.ts
│ └── Card/
│ ├── Card.module.css
│ ├── Card.types.ts
│ └── index.ts
├── utils/
│ ├── api.ts
│ ├── constants.ts
│ └── helpers.ts

## Main Configuration and Best Practices

This project follows a shared configuration designed for maintainable frontend and backend workflows.

### Requesting data from the backend

- Use a shared API client wrapper for consistent headers, auth tokens, and structured errors.
- Prefer SWR for cached data fetching, revalidation, and optimistic updates.
- Keep backend endpoints focused and return typed payloads.
- Avoid duplicate fetches by using unique SWR keys or centralized data hooks.

### Handling data in the frontend

- Keep data typed with TypeScript interfaces.
- Normalize backend responses when necessary.
- Use utility functions for formatting and transformation.
- Maintain minimal local UI state and derive most display values from data.
- Show loading states, skeletons, or placeholders to avoid layout shift.

### Handling errors in the frontend

- Wrap rendering boundaries with a client-side `ErrorBoundary`.
- Surface fetch errors with clear, actionable user feedback.
- Use toast/snackbar messages for transient problems.
- Log runtime errors to a monitoring service in production.
- Retry recoverable requests with exponential backoff when appropriate.

### Handling errors in the backend

- Validate request payloads and query parameters.
- Use a centralized error handler or middleware.
- Return consistent error responses with status codes and message keys.
- Log server errors with request context.
- Hide internal implementation details from production clients.

### Authentication and authorization

- Validate auth on every request and protect sensitive routes.
- Enforce role-based access control in UI and API layers.
- Store secrets outside source control and avoid exposing them client-side.
- Redirect unauthenticated users to a login route.

### State management

- Prefer local component state for transient UI values.
- Use remote-state hooks for data fetched from the backend.
- Use context providers only for shared concerns like auth, theme, and global settings.
- Avoid a large global store unless cross-cutting state requires it.
- Keep state logic modular and reusable.

### Routing

- Use Next.js App Router with nested routes and layouts.
- Keep route names clean and semantic.
- Protect private routes at the layout or page level.
- Use query parameters for filter and sort state when appropriate.
- Use client-side navigation for UX-friendly transitions.

### Forms and validation

- Use React Hook Form for performant form management.
- Use Yup for schema validation and error message generation.
- Keep form layout separate from submission logic.
- Display field-level errors inline.
- Reuse shared validation schemas between client and server.

### Testing

- Add tests for UI components, helpers, and API flows.
- Use React Testing Library for user interaction tests.
- Run linting, type checks, and tests in CI on every PR.
- Keep tests stable and focused on behavior.
- Use snapshot tests sparingly for stable UI fragments.

### Deployment and CI/CD

- Deploy with a reproducible build using `npm run build`.
- Use a CI workflow to run linting, type checks, tests, and builds.
- Use environment variables for configuration and keep secrets out of source control.
- Deploy only from protected branches or tags.
- Validate production deployments with smoke checks.

### Logging and monitoring

- Use structured logging on the backend.
- Capture client-side exceptions and request metadata.
- Monitor uptime, error rates, and performance trends.
- Alert on regressions and failing deployments.
- Keep logging lean to avoid sensitive data exposure.

### Performance and scalability

- Use lazy loading and code splitting for heavy pages.
- Cache data and assets appropriately.
- Keep server responses small and index database queries.
- Design APIs for composability and horizontal scaling.
- Use lightweight state where possible.

### Maintainability

- Use consistent naming, folder structure, and component patterns.
- Keep components focused and avoid deep nesting.
- Document shared utilities and architecture decisions.
- Review dependencies regularly and remove unused code.
- Use code reviews and linting to enforce standards.

## Takeaways

- Adjust the files in .github whenever there are changes in AI responses.
