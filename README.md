# Advanced Next.js Full-Stack Starter

This is an opinionated starter project for building modern, performant, and scalable full-stack applications using Next.js 15+ (App Router). It's pre-configured with a curated set of tools and libraries, adhering to best practices in TypeScript, React Server Components (RSC), UI/UX, security, and code architecture as defined by our comprehensive development guidelines.

The goal of this starter is to provide a robust foundation, allowing developers to quickly bootstrap new projects without repetitive setup, while ensuring high code quality and maintainability from the outset.

## Core Principles

This starter project embodies the following core principles:

- **Server Components First:** Prioritizing React Server Components for data fetching and rendering, minimizing client-side JavaScript.
- **TypeScript Everywhere:** Ensuring type safety across the entire stack.
- **Functional & Declarative Programming:** Avoiding classes and promoting clean, predictable code.
- **Modularity & Reusability:** Structuring code in a way that promotes reuse and separation of concerns.
- **Performance & Optimization:** Implementing best practices for Core Web Vitals, image optimization, and code splitting.
- **Security by Design:** Integrating secure authentication, input validation, and environment variable management.
- **Developer Experience:** Providing a streamlined setup with linting, formatting, and clear conventions.

## Key Technologies

- **Framework:** [Next.js](https://nextjs.org/) (v14+ App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Libraries:**
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI)
  - [Radix UI](https://www.radix-ui.com/) (for unstyled, accessible UI primitives)
  - [Framer Motion](https://www.framer.com/motion/) (for animations)
- **State Management:**
  - [Jotai](https://jotai.org/) (for client-side global/atomic state)
  - [TanStack React Query](https://tanstack.com/query/latest) (for server state, caching, and data synchronization)
  - [nuqs](https://nuqs.47ng.com/) (for URL search parameter state management)
- **Backend & Database:**
  - [Prisma ORM](https://www.prisma.io/)
  - [PostgreSQL](https://www.postgresql.org/) (recommended database)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (v5 / Auth.js)
- **Validation:** [Zod](https://zod.dev/) (for schema definition and validation)
- **Server Actions:** [next-safe-action](https://github.com/TheEdoRan/next-safe-action) (for type-safe server actions)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Environment Variables:** [@oss/env-nextjs](https://www.npmjs.com/package/@oss/env-nextjs)
- **Linting & Formatting:**
  - [ESLint](https://eslint.org/) (with Next.js, TypeScript, and custom rule configurations)
  - [Prettier](https://prettier.io/) (assumed, configured to work with ESLint)
- **Testing:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (setup encouraged)

## Project Structure Overview

The project follows a feature-first approach within the `src` directory:

```
src/
├── app/ # Next.js App Router: Routes, layouts, pages
│   ├── (auth)/ # Authentication-related routes (sign-in, etc.)
│   ├── (features)/ # Main application feature routes
│   │   └── [featureName]/ # Example: dashboard/, settings/
│   │       ├── page.tsx # Server Component for the route
│   │       ├── components/ # UI components specific to this feature
│   │       ├── actions.ts # Server Actions specific to this feature
│   │       └── types.ts # TypeScript types for this feature
│   ├── api/ # API routes (e.g., NextAuth.js handler)
│   ├── layout.tsx # Root layout
│   ├── global.css # Global styles (Tailwind base, etc.)
│   └── providers.tsx # Client-side context providers (Jotai, React Query)
├── components/ # Shared UI components
│   ├── ui/ # Shadcn UI components (e.g., Button, Input)
│   ├── shared/ # Custom shared components
│   └── icons/ # SVG icons as React components
├── features/ # Optional: For complex feature logic not directly tied to a route
│   └── [featureName]/
│       ├── services/
│       ├── hooks/
│       └── utils/
├── lib/ # Utility functions, Prisma client instance, cn(), etc.
├── hooks/ # Global custom React hooks
├── types/ # Global or shared TypeScript types and interfaces
├── actions/ # Global Server Actions (if not feature-specific)
├── services/ # For external API service integrations
└── env.ts # Environment variable schema and parsing (@oss/env-nextjs)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version, e.g., v18 or v20)
- [bun](https://bun.sh/)
- A [PostgreSQL](https://www.postgresql.org/download/) database instance running.
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/asrafilll/next-starter.git
cd next-starter
```

### 2. Install Dependencies

Using bun:

```bash
bun install
```

### 3. Set Up Environment Variables

Copy the example environment file and update it with your configuration:

```bash
cp .env.example .env
```

Open `.env` and fill in the required variables:

- **`DATABASE_URL`**: Your PostgreSQL connection string (e.g., `postgresql://user:password@host:port/database?sslmode=prefer`)
- **`NEXTAUTH_SECRET`**: A strong secret for NextAuth.js (generate one using `openssl rand -base64 32`)
- **`NEXTAUTH_URL`**: The canonical URL of your deployment (e.g., `http://localhost:3000` for development).
- **OAuth Provider Credentials** (if configured, e.g., `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`).

Refer to `src/env.ts` for the schema of expected environment variables.

### 4. Set Up the Database

Generate the Prisma client and run database migrations:

```bash
bunx prisma generate
bunx prisma migrate dev --name init
```

This will create the necessary tables in your PostgreSQL database based on the schema in `prisma/schema.prisma`.

### 5. Run the Development Server

```bash
bun run dev
```

Open `http://localhost:3000` in your browser to see the application.

## Available Scripts

- `dev`: Starts the development server. (`bun run dev`)
- `build`: Creates a production build of the application. (`bun run build`)
- `start`: Starts a production server (after running build). (`bun run start`)
- `lint`: Lints the codebase using ESLint. (`bun run lint`)
- `lint:fix`: Lints and automatically fixes issues. (`bun run lint:fix`)
- `format`: Formats the codebase using Prettier (configure if not part of lint).
- `prisma:generate`: Generates/updates the Prisma Client. (`bunx prisma generate`)
- `prisma:migrate:dev`: Creates and applies a new database migration. (`bunx prisma migrate dev --name <migration_name>`)
- `prisma:studio`: Opens Prisma Studio to view and manage your data. (`bunx prisma studio`)
- `test`: Runs tests using Jest (configure test scripts).

## Key Features of This Starter

Next.js 14+ App Router: Leverages the latest Next.js features.
Pre-configured Authentication: NextAuth.js with Prisma adapter and example providers.
Type-Safe Environment Variables: Using @oss/env-nextjs.
Type-Safe Server Actions: Using next-safe-action with Zod validation.
UI Components: Shadcn UI for beautiful, accessible components out-of-the-box.
State Management Solutions: Jotai for client-state and TanStack React Query for server-state.
Database ORM: Prisma for easy and type-safe database interactions.
Strict Linting & Formatting: Ensuring code quality and consistency.
RSC-First Architecture: Examples of Server Components fetching data and Client Components for interactivity.

## Architectural Decisions & Conventions

This starter adheres to the comprehensive development guidelines, including:

Server Components as default: Client Components ('use client') are used sparingly for interactivity.
Error Handling: Structured error handling for Server Actions and API routes. Error boundaries are encouraged.
Input Validation: Zod is used for all external data validation (forms, API inputs, server actions).
Styling: Tailwind CSS is used exclusively for styling.
Functional Programming: Components and utility functions are written as functions, avoiding classes.
File Naming & Structure: Consistent naming conventions (lowercase-with-dashes for directories) and feature-based organization.

## Contributing

If this were an open-source project, contribution guidelines would go here. For now, adhere to the established coding standards and practices.

## License

This project is licensed under the MIT License (or your chosen license). Create a LICENSE.md file accordingly.

```

```
