const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'tokohpl';

export function getEdlImageUrl(code: string) {
  const normalized = code
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/edl/${normalized}.webp`;
}

export function getEdlImageCandidates(code: string) {
  const normalized = code
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return [
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/edl/${normalized}.webp`,
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/edl/${normalized}.jpg`,
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/edl/${normalized}.png`,
  ];
}

export function getLamitakImageCandidates(code: string) {
  const matches = code.match(/\d{4,5}/g) || [];
  const keys: string[] = [];
  for (const v of matches) {
    keys.push(v);
    if (v.length === 5 && v.startsWith('1')) keys.push(v.slice(1));
  }
  const unique = Array.from(new Set(keys));

  return unique.flatMap((k) => [
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/lamitak/${k}.webp`,
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/lamitak/${k}.jpg`,
  ]);
}

export function getProductImageCandidates(brand: string, code: string) {
  if (brand?.toLowerCase() === 'edl') return getEdlImageCandidates(code);
  return getLamitakImageCandidates(code);
}
