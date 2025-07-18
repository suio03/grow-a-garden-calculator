
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from "next-intl/server"
import type { ReactNode } from 'react'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { generatePageMetadata } from '@/lib/metadata-utils'

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

type Props = {
    children: ReactNode
    params: Promise<{ locale: string }>
}
export async function generateMetadata({
    params
}: Omit<Props, 'children'>) {
    const { locale } = await params
    return generatePageMetadata({
        locale,
        namespace: 'page',
        titleKey: 'seo-title',
        descriptionKey: 'seo-description'
    })
}

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const messages = await getMessages()
    const htmlLang = getHreflangCode(locale || 'en')
    return (
        <html lang={htmlLang}>
            <body className="font-sans antialiased text-gray-800 tracking-tight">
                {/* Beautiful gradient background */}
                <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
                </div>
                
                <NextIntlClientProvider messages={messages}>
                    <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-1 max-w-4xl mx-auto">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
