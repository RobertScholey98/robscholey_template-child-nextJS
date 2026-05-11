/**
 * Liveness probe consumed by the container HEALTHCHECK directive.
 *
 * Lives in the template so every forked sub-app inherits a working
 * healthcheck without per-app setup — the parametrised Next-app Dockerfile
 * polls this route to decide whether the standalone server has booted.
 */
export function GET() {
  return new Response('ok', { status: 200 });
}
