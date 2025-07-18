import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Map URL locale codes to existing directory names (currently they're the same)
function getMessageDirectory(locale: string): string {
    const localeMap: Record<string, string> = {
        'en': 'en',
        'de': 'de',
        'jp': 'jp',
        'fr': 'fr',
        'es': 'es',
        'it': 'it',
        'pt': 'pt',
        'ru': 'ru',
        'ko': 'ko',
        'zh': 'zh',
        'ar': 'ar',
        'hi': 'hi',
        'nl': 'nl'
    };
    
    return localeMap[locale] || locale;
}

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
        locale = routing.defaultLocale;
    }

    // Map the locale to the correct directory name
    const messageDirectory = getMessageDirectory(locale);

    return {
        locale,
        messages: (await import(`../messages/${messageDirectory}/i18n.json`)).default,
    };
});
