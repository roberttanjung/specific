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
- **Tailwind v4**: CSS Preprocessor.
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

- Login SSO with Microsoft
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
│ │ ├── Dashboard.tsx
│ │ ├── Dashboard.module.css
│ │ ├── Dashboard.types.ts
│ │ └── index.ts
│ └── Profile/
│ ├── Profile.tsx
│ ├── Profile.module.css
│ ├── Profile.types.ts
│ └── index.ts
├── components/
│ ├── Button/
│ │ ├── Button.tsx
│ │ ├── Button.module.css
│ │ ├── Button.types.ts
│ │ └── index.ts
│ └── Card/
│ ├── Card.tsx
│ ├── Card.module.css
│ ├── Card.types.ts
│ └── index.ts
├── utils/
│ ├── api.ts
│ ├── constants.ts
│ └── helpers.ts

## Takeaways

- Adjust the files in .github whenever there are changes in AI responses.
