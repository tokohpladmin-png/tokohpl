export function normalizeCode(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Currency stays Rp/id-ID grouping regardless of site locale — Rupiah
// formatting convention is universal, not tied to UI language.
export function formatIDR(value?: number | null): string | null {
  if (typeof value !== 'number') return null;
  return `Rp ${value.toLocaleString('id-ID')}`;
}

// Dates switch formatting convention per site locale for a native reading
// experience (id-ID under /id, en-US under /en); amounts stay in WIB.
export function formatDate(
  date: Date | string | number,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const intlLocale = locale === 'en' ? 'en-US' : 'id-ID';
  return d.toLocaleString(intlLocale, options);
}

export function uniq<T>(items: T[]): T[] {
  return Array.from(new Set(items.filter(Boolean)));
}
