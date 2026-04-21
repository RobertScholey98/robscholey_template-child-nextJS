import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ShellContextProvider, useShell } from './ShellContext';
import type { ShellContextState } from '@robscholey/shell-kit';
import type { ReactNode } from 'react';
import { vi } from 'vitest';

const mockShellState: ShellContextState = {
  isEmbedded: true,
  showBackButton: true,
  user: { id: 'user-1', name: 'Rob', type: 'owner' },
  jwt: 'test-jwt',
  isSessionValid: true,
  subPath: null,
  theme: 'light',
  accent: 'teal',
  requestJWTRefresh: vi.fn(),
  requestThemeChange: vi.fn(),
  requestAccentChange: vi.fn(),
};

function wrapper({ children }: { children: ReactNode }) {
  return (
    <ShellContextProvider value={mockShellState}>{children}</ShellContextProvider>
  );
}

describe('useShell', () => {
  it('returns shell context state when inside provider', () => {
    const { result } = renderHook(() => useShell(), { wrapper });

    expect(result.current.isEmbedded).toBe(true);
    expect(result.current.user?.name).toBe('Rob');
    expect(result.current.jwt).toBe('test-jwt');
    expect(result.current.theme).toBe('light');
  });

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useShell());
    }).toThrow('useShell must be used within a ShellProvider');
  });
});
