'use client';

import { createContext, useContext } from 'react';
import type { ShellContextState } from '@robscholey/shell-kit';

const ShellCtx = createContext<ShellContextState | null>(null);

/** Provider that passes shell state to the tree. Used internally by ShellProvider. */
export const ShellContextProvider = ShellCtx.Provider;

/**
 * Returns the shell context state (user, JWT, theme, embedded status).
 * Must be used within a ShellProvider.
 */
export function useShell(): ShellContextState {
  const ctx = useContext(ShellCtx);
  if (!ctx) {
    throw new Error('useShell must be used within a ShellProvider');
  }
  return ctx;
}
