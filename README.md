# robscholey_template-child-nextjs

A template Next.js sub-application for [robscholey.com](https://robscholey.com). Includes the minimal boilerplate needed to connect to the shell via `@robscholey/shell-kit`.

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Runs on `http://localhost:3002`. To test inside the shell, register this app in the auth service with `url: http://localhost:3002`.

## What's included

- **ShellProvider** — wraps the app with shell-kit integration (context, route sync, back button, theme)
- **useShell()** — hook to access shell state (user, JWT, theme, embedded status) from any component
- **Shell-kit UI components** — Typography, Button, etc. via `@robscholey/shell-kit/ui`
- **Theme CSS** — imported from shell-kit for consistent light/dark theming
- **Route sync** — sub-app route changes are mirrored in the shell's URL bar
- **Example page** — demonstrates sub-page routing (shell URL updates to `/your-slug/example`)

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SHELL_ORIGIN` | Shell origin for postMessage validation | `http://localhost:3000` |

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server on port 3002 |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build on port 3002 |
| `pnpm test` | Run tests |
| `pnpm lint` | Lint with ESLint |
| `pnpm format` | Format with Prettier |

## Architecture

```
src/
  app/
    layout.tsx          # Root layout with ShellProvider
    page.tsx            # Home page showing shell context info
    example/
      page.tsx          # Example sub-page for route sync demo
    globals.css         # Tailwind + shell-kit theme import
  components/
    ShellProvider.tsx    # Shell-kit integration wrapper
    ShellContext.tsx     # React context for sharing shell state
```

## How it connects to the shell

1. `ShellProvider` calls `configure()` with the shell origin and `useShellContext()` to establish the postMessage bridge
2. When the shell loads this app in an iframe, it sends a `shell-context` message with user, JWT, theme, and sub-path
3. `useRouteSync()` sends `route-change` messages to the shell on every Next.js navigation
4. `ShellBackButton` renders a back button when embedded, navigating back to the shell on click
5. The `useShell()` hook provides shell state to any component in the tree
