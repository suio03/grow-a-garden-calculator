import Link from "next/link";
import { useTranslations } from 'next-intl'

export const runtime = 'edge'

export default function Privacy() {
    const t = useTranslations('privacy')
    
    const renderList = (key: string) => {
        try {
            const items = t.raw(key)
            if (!Array.isArray(items)) {
                console.warn(`Expected array for ${key} but got:`, typeof items)
                return null
            }
            return items.map((item, index) => (
                <li key={index} className="ml-5 list-disc">{item}</li>
            ))
        } catch (error) {
            console.error(`Error rendering list for ${key}:`, error)
            return null
        }
    }

    return (
        <div className="mt-24">
            <main className="max-w-xl mx-auto">
                <div className="p-5">
                    <Link href="/" className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                                clipRule="evenodd"
                            />
                        </svg>{" "}
                        Back
                    </Link>
                    <h1 className="text-3xl font-extrabold pb-6">
                        {t('title')}
                    </h1>

                    <div className="space-y-6">
                        <p>{t('last-updated')}</p>

                        <section>
                            <h2 className="text-xl font-bold">{t('introduction.title')}</h2>
                            <p>{t('introduction.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('information-we-collect.title')}</h2>
                            <div>
                                <h3 className="font-semibold">{t('information-we-collect.personal-data.title')}</h3>
                                <p>{t('information-we-collect.personal-data.content')}</p>
                                <ul className="mt-2">
                                    {renderList('information-we-collect.personal-data.items')}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold">{t('information-we-collect.service-data.title')}</h3>
                                <p>{t('information-we-collect.service-data.content')}</p>
                                <ul className="mt-2">
                                    {renderList('information-we-collect.service-data.items')}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold">{t('information-we-collect.technical-data.title')}</h3>
                                <p>{t('information-we-collect.technical-data.content')}</p>
                                <ul className="mt-2">
                                    {renderList('information-we-collect.technical-data.items')}
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('data-usage.title')}</h2>
                            <div>
                                <h3 className="font-semibold">{t('data-usage.service-provision.title')}</h3>
                                <p>{t('data-usage.service-provision.content')}</p>
                                <ul className="mt-2">
                                    {renderList('data-usage.service-provision.items')}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold">{t('data-usage.service-improvement.title')}</h3>
                                <p>{t('data-usage.service-improvement.content')}</p>
                                <ul className="mt-2">
                                    {renderList('data-usage.service-improvement.items')}
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('data-retention.title')}</h2>
                            <p>{t('data-retention.content')}</p>
                            <ul className="mt-2">
                                {renderList('data-retention.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('data-sharing.title')}</h2>
                            <p>{t('data-sharing.content')}</p>
                            <ul className="mt-2">
                                {renderList('data-sharing.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('data-protection-rights.title')}</h2>
                            <p>{t('data-protection-rights.content')}</p>
                            <ul className="mt-2">
                                {renderList('data-protection-rights.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('content-generation-privacy.title')}</h2>
                            <p>{t('content-generation-privacy.content')}</p>
                            <ul className="mt-2">
                                {renderList('content-generation-privacy.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('childrens-privacy.title')}</h2>
                            <p>{t('childrens-privacy.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('security-measures.title')}</h2>
                            <p>{t('security-measures.content')}</p>
                            <ul className="mt-2">
                                {renderList('security-measures.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('data-protection-practices.title')}</h2>
                            <p>{t('data-protection-practices.content')}</p>
                            <ul className="mt-2">
                                {renderList('data-protection-practices.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('international-data-transfers.title')}</h2>
                            <p>{t('international-data-transfers.content')}</p>
                            <ul className="mt-2">
                                {renderList('international-data-transfers.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('policy-updates.title')}</h2>
                            <p>{t('policy-updates.content')}</p>
                            <ul className="mt-2">
                                {renderList('policy-updates.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('your-rights.title')}</h2>
                            <p>{t('your-rights.content')}</p>
                            <ul className="mt-2">
                                {renderList('your-rights.items')}
                            </ul>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    )
}
