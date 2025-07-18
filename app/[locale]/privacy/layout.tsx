import { ReactNode } from "react"
import { generatePageMetadata } from "@/lib/metadata-utils"

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
        namespace: 'privacy',
        titleKey: 'seo-title',
        descriptionKey: 'seo-description'
    })
}

export default async function PrivacyLayout({
    children,
}: {
    children: ReactNode
}) {
    return <>{children}</>
} 