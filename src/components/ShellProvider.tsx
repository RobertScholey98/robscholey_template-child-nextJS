'use client';

import { useRouter } from 'next/navigation';
import {
  ShellKitProvider,
  useShellContext,
  useRouteSync,
  ShellBackButton,
} from '@robscholey/shell-kit';
import { ShellContextProvider } from './ShellContext';

const SHELL_ORIGIN = process.env.NEXT_PUBLIC_SHELL_ORIGIN || 'http://localhost:3000';

/** Props for the {@link ShellProvider} component. */
export interface ShellProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app with shell-kit integration. Handles:
 * - Shell context (user, JWT, embedded state)
 * - Route sync (sends route changes to the shell)
 * - Navigate-to-path (shell tells child to navigate on back/forward)
 * - Back button (shown when embedded in the shell)
 *
 * Theme + accent are page-owned now: the layout SSR-renders the
 * admin-configured default into `<html data-*>` and `<PageTheme>`
 * overrides at the route level. The shell observes via `page-theme`.
 *
 * Use the `useShell()` hook from `@/components/ShellContext` to access
 * the shell state (user, JWT, embedded) from any child component.
 */
export function ShellProvider({ children }: ShellProviderProps) {
  return (
    <ShellKitProvider config={{ shellOrigin: SHELL_ORIGIN }}>
      <ShellProviderInner>{children}</ShellProviderInner>
    </ShellKitProvider>
  );
}

/**
 * Inner provider that consumes shell-kit hooks. Split from {@link ShellProvider}
 * so the hooks resolve against the surrounding {@link ShellKitProvider}.
 */
function ShellProviderInner({ children }: ShellProviderProps) {
  const router = useRouter();

  const shell = useShellContext((path) => {
    router.push(path || '/');
  });

  useRouteSync();

  return (
    <ShellContextProvider value={shell}>
      <ShellBackButton
        isEmbedded={shell.isEmbedded}
        showBackButton={shell.showBackButton}
        className="fixed top-4 left-4 z-[60] rounded-md bg-accent-deep px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent-deep/90 transition-colors"
      />
      {children}
    </ShellContextProvider>
  );
}
