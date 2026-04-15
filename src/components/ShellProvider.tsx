'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  configure,
  useShellContext,
  useRouteSync,
  ShellBackButton,
} from '@robscholey/shell-kit';
import { ShellContextProvider } from './ShellContext';

// Configure shell-kit with the shell's origin on module load
configure({
  shellOrigin: process.env.NEXT_PUBLIC_SHELL_ORIGIN || 'http://localhost:3000',
});

/** Props for the {@link ShellProvider} component. */
export interface ShellProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app with shell-kit integration. Handles:
 * - Shell context (user, JWT, theme, embedded state)
 * - Route sync (sends route changes to the shell)
 * - Navigate-to-path (shell tells child to navigate on back/forward)
 * - Back button (shown when embedded in the shell)
 *
 * Use the `useShell()` hook from `@/components/ShellContext` to access
 * the shell state (user, JWT, theme) from any child component.
 */
export function ShellProvider({ children }: ShellProviderProps) {
  const router = useRouter();

  const shell = useShellContext((path) => {
    router.push(path || '/');
  });

  useRouteSync();

  // Apply theme from shell
  useEffect(() => {
    document.documentElement.classList.toggle('dark', shell.theme === 'dark');
  }, [shell.theme]);

  return (
    <ShellContextProvider value={shell}>
      <ShellBackButton
        isEmbedded={shell.isEmbedded}
        showBackButton={shell.showBackButton}
        className="fixed top-4 left-4 z-50 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      />
      {children}
    </ShellContextProvider>
  );
}
