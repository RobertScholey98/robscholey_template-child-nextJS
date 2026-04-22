/**
 * SSR fetch for the template app's admin-configured theming defaults. Hits
 * the unauthenticated `/api/apps/:slug/meta` endpoint on the
 * auth-microservice so the root layout can render `<html data-theme>` /
 * `<html data-accent>` with the right values baked into the SSR HTML.
 *
 * Falls soft on failure (cold start, network, auth-microservice unreachable)
 * and returns `dark` / `mono` (the canonical defaults for the template
 * surface). Layouts can't throw without breaking the page; a cosmetic
 * default is acceptable degradation.
 *
 * The template app intentionally doesn't depend on `@robscholey/contracts`
 * so this helper hand-rolls the response shape rather than importing
 * `AppMeta` — keeps the dep surface narrow for downstream forks.
 */

/** Two-value light/dark theme. Mirrors `@robscholey/contracts`'s `ShellTheme`. */
export type ShellTheme = 'light' | 'dark';
/** Seven-variant accent palette. Mirrors `@robscholey/contracts`'s `Accent`. */
export type Accent = 'teal' | 'warm' | 'mono' | 'rose' | 'indigo' | 'betway' | 'fsgb';

/** Public app-meta returned by the auth-microservice. */
export interface AppMeta {
  name: string;
  iconUrl: string;
  defaultTheme: ShellTheme;
  defaultAccent: Accent;
}

const FALLBACK: Pick<AppMeta, 'defaultTheme' | 'defaultAccent'> = {
  defaultTheme: 'dark',
  defaultAccent: 'mono',
};

const THEMES: ReadonlySet<ShellTheme> = new Set<ShellTheme>(['light', 'dark']);
const ACCENTS: ReadonlySet<Accent> = new Set<Accent>([
  'teal',
  'warm',
  'mono',
  'rose',
  'indigo',
  'betway',
  'fsgb',
]);

/** Resolves the auth-microservice base URL — server-side first, browser fallback, dev default. */
function resolveAuthUrl(): string {
  const raw =
    typeof window === 'undefined'
      ? (process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_AUTH_URL)
      : process.env.NEXT_PUBLIC_AUTH_URL;
  return raw ?? 'http://localhost:3001';
}

/**
 * Fetches the per-app theming defaults for `slug`. Cached for 60 s on the
 * Next.js data layer.
 *
 * @param slug - The app id as registered in `appsConfig.json`.
 * @returns The admin-configured theme + accent defaults, or the fallback pair.
 */
export async function fetchAppMeta(
  slug: string,
): Promise<Pick<AppMeta, 'defaultTheme' | 'defaultAccent'>> {
  try {
    const res = await fetch(`${resolveAuthUrl()}/api/apps/${encodeURIComponent(slug)}/meta`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(
        `[fetchAppMeta] /apps/${slug}/meta returned ${res.status}; falling back to ${FALLBACK.defaultTheme}/${FALLBACK.defaultAccent}`,
      );
      return FALLBACK;
    }
    const body = (await res.json()) as Partial<AppMeta>;
    return {
      defaultTheme: THEMES.has(body.defaultTheme as ShellTheme)
        ? (body.defaultTheme as ShellTheme)
        : FALLBACK.defaultTheme,
      defaultAccent: ACCENTS.has(body.defaultAccent as Accent)
        ? (body.defaultAccent as Accent)
        : FALLBACK.defaultAccent,
    };
  } catch (err) {
    console.warn(
      `[fetchAppMeta] /apps/${slug}/meta failed (${err instanceof Error ? err.message : 'unknown'}); falling back to ${FALLBACK.defaultTheme}/${FALLBACK.defaultAccent}`,
    );
    return FALLBACK;
  }
}
