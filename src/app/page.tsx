'use client';

import Link from 'next/link';
import { Typography, Button } from '@robscholey/shell-kit/ui';
import { useShell } from '@/components/ShellContext';

/** Home page — displays shell context info and navigation to example sub-page. */
export default function Home() {
  const { isEmbedded, user, jwt } = useShell();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-md space-y-4">
        <Typography variant="h2">Next.js Template</Typography>
        <Typography variant="small">
          This is a template sub-application for robscholey.com. It demonstrates
          shell-kit integration with the postMessage bridge.
        </Typography>

        <div className="rounded-xl border bg-surface p-4 space-y-2">
          <Typography variant="mono-label">Shell Context</Typography>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="text-text-muted">Embedded:</dt>
            <dd>{isEmbedded ? 'Yes' : 'No (standalone)'}</dd>
            <dt className="text-text-muted">User:</dt>
            <dd>{user ? user.name : 'None'}</dd>
            <dt className="text-text-muted">JWT:</dt>
            <dd className="truncate">{jwt ? `${jwt.slice(0, 20)}...` : 'None'}</dd>
          </dl>
        </div>

        <Link href="/example">
          <Button className="w-full">Go to example page</Button>
        </Link>
      </div>
    </div>
  );
}
