'use client'

import { useTranslations } from 'next-intl'
import LanSwitcher from '@/components/ui/lan-switcher'
import VioletCorn from '@/public/favicon.svg'
import Image from 'next/image'
import Link from 'next/link'
export default function Header() {
    const t = useTranslations('page')
    return (
        <header className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <Image src={VioletCorn} alt="Violet Corn" width={64} height={64} />
                            <h1 className="text-xl font-bold text-gray-800">Grow a Garden Calculator</h1>
                        </Link>
                        <LanSwitcher />
                    </div>
                </div>
            </div>
        </header>
    )
} 