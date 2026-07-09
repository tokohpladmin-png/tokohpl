import { notFound } from 'next/navigation';

// Catches any path under a valid /[locale]/... prefix that doesn't match a
// real route, so it reaches the localized `not-found.tsx` boundary instead
// of falling through to the bare `global-not-found.tsx`.
export default function CatchAll() {
  notFound();
}
