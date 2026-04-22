import type { Metadata } from 'next';
import { ShellProvider } from '@/components/ShellProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Template — robscholey.com',
  description: 'A template Next.js sub-application for robscholey.com',
};

/** Root layout — wraps the app in the ShellProvider for shell-kit integration. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
