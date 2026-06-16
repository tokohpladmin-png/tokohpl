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

export function formatIDR(value?: number | null) {
  if (typeof value !== 'number') return 'Harga menyusul';
  return `Rp ${value.toLocaleString('id-ID')}`;
}

export function uniq<T>(items: T[]): T[] {
  return Array.from(new Set(items.filter(Boolean)));
}
