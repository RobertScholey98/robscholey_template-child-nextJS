'use client';

import Link from 'next/link';
import { Typography, Button } from '@robscholey/shell-kit/ui';

/**
 * Example sub-page — demonstrates route sync with the shell.
 * When embedded, navigating here updates the shell's URL bar
 * (e.g. `/my-app/example`) via the route-change postMessage.
 */
export default function ExamplePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-md space-y-4">
        <Typography variant="h2">Example Page</Typography>
        <Typography variant="muted">
          This is a sub-page. If you&apos;re running inside the shell, check the
          browser URL bar — it should show <code>/your-app-slug/example</code>.
          Hitting back should navigate within the iframe, not exit the app.
        </Typography>

        <Link href="/">
          <Button variant="outline" className="w-full">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
