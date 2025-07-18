'use client'
import { usePathname } from 'next/navigation'
import { LanguageIcon } from '@heroicons/react/24/outline'

const languages = [
    { name: 'English', href: '/en', locale: 'en', country: '🇺🇲' },
    { name: '日本語', href: '/jp', locale: 'jp', country: '🇯🇵' },
    { name: ' 中文', href: '/zh', locale: 'zh', country: '🇨🇳' },
    { name: '한국어', href: '/ko', locale: 'ko', country: '🇰🇷' },
    // 西班牙语
    { name: 'Español', href: '/es', locale: 'es', country: '🇪🇸' },
    // 法语
    { name: 'Français', href: '/fr', locale: 'fr', country: '🇫🇷' },
    // 德语
    { name: 'Deutsch', href: '/de', locale: 'de', country: '🇩🇪' },
    // 意大利语
    { name: 'Italiano', href: '/it', locale: 'it', country: '🇮🇹' },
    // 葡萄牙语
    { name: 'Português', href: '/pt', locale: 'pt', country: '🇵🇹' },
    // 俄语
    { name: 'Русский', href: '/ru', locale: 'ru', country: '🇷🇺' },
    // 阿拉伯语
    { name: 'العربية', href: '/ar', locale: 'ar', country: '🇸🇦' },
    // 印地语
    { name: 'हिंदी', href: '/hi', locale: 'hi', country: '🇮🇳' },
    { name: 'Nederlands', href: '/nl', locale: 'nl', country: '🇳🇱' },
]

export default function LanSwitcher() {
    const pathname = usePathname()
    const pathItems = pathname.split('/').filter(item => item !== '')
    // Default locale
    let currentLocale = 'en'
    let toPath = ''

    if (pathname === '/') {
        toPath = ''
    } else if (pathItems.length === 1) {
        const [firstItem] = pathItems
        if (isLocale(firstItem)) {
            currentLocale = firstItem
        } else {
            toPath = firstItem
        }
    } else {
        const [firstItem, ...restItems] = pathItems
        if (isLocale(firstItem)) {
            currentLocale = firstItem
            toPath = restItems.join('/')
        } else {
            currentLocale = 'en'
            toPath = pathItems.join('/')
        }
    }
    function isLocale(item: string) {
        return languages.some(lang => lang.locale === item)
    }

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value
        window.location.href = `/${newLocale}/${toPath}`
    }

    return (
        <div className="flex items-center gap-2 cursor-pointer">
            <LanguageIcon className="h-5 w-5 " />
            <select
                value={currentLocale}
                onChange={handleLanguageChange}
                className="border border-gray-700 rounded-full px-4 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {languages.map((lang) => (
                    <option key={lang.locale} value={lang.locale}>
                        {lang.country} {lang.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
