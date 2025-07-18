import { getTranslations } from "next-intl/server"
import { cookies } from "next/headers"

interface MetadataParams {
    locale: string
    namespace: string
    titleKey?: string
    descriptionKey?: string
}

export async function generatePageMetadata({
    locale,
    namespace,
    titleKey = 'seo-title',
    descriptionKey = 'seo-description'
}: MetadataParams) {
    const t = await getTranslations({ locale, namespace })
    const cookieStore = await cookies()
    let pathName = cookieStore.get('x-pathname')?.value || '/'
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://gagcalculator.cc' : 'http://localhost:3000'
    
    // URL locale codes (what appears in URLs)
    const urlLocales = ['ar', 'zh', 'es', 'fr', 'pt', 'ru', 'ko', 'jp', 'de', 'it', 'hi', 'nl']

    // Clean up the pathname
    if (pathName !== '/' && pathName.endsWith('/')) {
        pathName = pathName.slice(0, -1)
    }

    // Remove locale from pathname if it exists
    const pathWithoutLocale = pathName.split('/').filter(segment => !urlLocales.includes(segment)).join('/')

    // Construct the canonical URL
    const localePath = locale === 'en' ? '' : `/${locale}`
    const site_url = localePath === '' && pathWithoutLocale === '/'
        ? `${baseUrl}/`
        : `${baseUrl}${localePath}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

    // Map URL locale codes to proper SEO hreflang codes
    function getHreflangCode(urlLocale: string): string {
        const hreflangMap: Record<string, string> = {
            'en': 'en',
            'ar': 'ar',
            'zh': 'zh-CN',
            'es': 'es-ES', 
            'fr': 'fr-FR',
            'pt': 'pt-BR',
            'ru': 'ru-RU',
            'ko': 'ko-KR',
            'jp': 'ja-JP',
            'de': 'de-DE',
            'it': 'it-IT',
            'hi': 'hi-IN',
            'nl': 'nl-NL'
        };
        return hreflangMap[urlLocale] || urlLocale;
    }

    // Generate language alternates using proper SEO hreflang codes
    const allUrlLocales = ['en', ...urlLocales];
    const languages = allUrlLocales.reduce((acc, urlLocale) => {
        const hreflangCode = getHreflangCode(urlLocale);
        
        if (urlLocale === 'en') {
            // English uses no locale prefix
            acc[hreflangCode as keyof typeof acc] = `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
        } else {
            // Other locales use simple URL locale prefix
            acc[hreflangCode as keyof typeof acc] = `${baseUrl}/${urlLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
        }
        return acc
    }, {} as Record<string, string>)
    languages['x-default'] = `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

    return {
        title: t(titleKey),
        description: t(descriptionKey),
        alternates: {
            canonical: site_url,
            languages: languages
        }
    }
} 