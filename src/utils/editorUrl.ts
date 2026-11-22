/**
 * Computes the absolute URL to editor.html correctly across all environments:
 * - Localhost dev server: http://localhost:5173/editor.html
 * - GitHub Pages project: https://fhanidhammanikanta.github.io/oneclickstudio/editor.html
 * Handles pathnames whether or not they end with a trailing slash.
 */
export function getEditorUrl(): string {
  if (typeof window === 'undefined') return 'editor.html';

  const { origin, pathname } = window.location;
  const segments = pathname.split('/').filter(Boolean);

  // If deployed under a repository subpath (e.g. /oneclickstudio or /oneclickstudio/)
  // The first segment is the repo name unless it's a file like index.html
  if (segments.length > 0 && !segments[0].includes('.')) {
    return `${origin}/${segments[0]}/editor.html`;
  }

  return `${origin}/editor.html`;
}
