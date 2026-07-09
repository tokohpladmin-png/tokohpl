import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// Maps message namespace (used in useTranslations('Namespace')) to its JSON file
// under messages/<locale>/<file>.json.
const NAMESPACE_FILES: Record<string, string> = {
  Common: 'common',
  Nav: 'nav',
  Footer: 'footer',
  Home: 'home',
  Products: 'products',
  ProductDetail: 'productDetail',
  About: 'about',
  Contact: 'contact',
  PrivacyPolicy: 'privacyPolicy',
  NotFound: 'notFound',
  ChatWidget: 'chatWidget',
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const entries = await Promise.all(
    Object.entries(NAMESPACE_FILES).map(async ([namespace, file]) => {
      const mod = await import(`../../messages/${locale}/${file}.json`);
      return [namespace, mod.default ?? mod] as const;
    }),
  );

  return {
    locale,
    messages: Object.fromEntries(entries),
  };
});
