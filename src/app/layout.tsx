import type { Metadata } from 'next';
import { ShellProvider } from '@/components/ShellProvider';
import { fetchAppMeta } from '@/lib/fetchAppMeta';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Template — robscholey.com',
  description: 'A template Next.js sub-application for robscholey.com',
};

/**
 * Root layout. SSR-fetches the template app's `defaultTheme` +
 * `defaultAccent` from the auth-microservice so `<html data-theme>` /
 * `<html data-accent>` are accent-correct on first paint.
 */
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { defaultTheme, defaultAccent } = await fetchAppMeta('template-child-nextjs');
  return (
    <html lang="en" data-theme={defaultTheme} data-accent={defaultAccent}>
      <body className="min-h-dvh bg-bg text-text antialiased">
        <ShellProvider>
          <main id="main-content" className="flex min-h-dvh flex-col">
            {children}
          </main>
        </ShellProvider>
      </body>
    </html>
  );
}
