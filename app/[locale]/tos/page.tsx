import Link from "next/link"
import { useTranslations } from 'next-intl'

export const runtime = 'edge'
const TOS = () => {
    const t = useTranslations('tos')
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
                        </svg>
                        Back
                    </Link>
                    <h1 className="text-3xl font-extrabold pb-6">
                        {t('title')}
                    </h1>

                    <div className="space-y-6">
                        <p>{t('last-updated')}</p>

                        <section>
                            <h2 className="text-xl font-bold">{t('acceptance.title')}</h2>
                            <p>{t('acceptance.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('description.title')}</h2>
                            <p>{t('description.content')}</p>
                            <ul className="mt-2">
                                {renderList('description.features')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('accounts.title')}</h2>
                            <p>{t('accounts.content')}</p>
                            <ul className="mt-2">
                                {renderList('accounts.requirements')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('fees.title')}</h2>
                            <div>
                                <h3 className="font-semibold">{t('fees.payment-terms.title')}</h3>
                                <ul className="mt-2">
                                    {renderList('fees.payment-terms.items')}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold">{t('fees.refund-policy.title')}</h3>
                                <ul className="mt-2">
                                    {renderList('fees.refund-policy.items')}
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('acceptable-use.title')}</h2>
                            <p>{t('acceptable-use.content')}</p>
                            <ul className="mt-2">
                                {renderList('acceptable-use.restrictions')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('intellectual-property.title')}</h2>
                            <div>
                                <h3 className="font-semibold">{t('intellectual-property.service-ownership.title')}</h3>
                                <ul className="mt-2">
                                    {renderList('intellectual-property.service-ownership.items')}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold">{t('intellectual-property.user-rights.title')}</h3>
                                <ul className="mt-2">
                                    {renderList('intellectual-property.user-rights.items')}
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('content-guidelines.title')}</h2>
                            <p>{t('content-guidelines.content')}</p>
                            <ul className="mt-2">
                                {renderList('content-guidelines.requirements')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('limitations.title')}</h2>
                            <p>{t('limitations.content')}</p>
                            <ul className="mt-2">
                                {renderList('limitations.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('privacy.title')}</h2>
                            <p>{t('privacy.content')}</p>
                            <ul className="mt-2">
                                {renderList('privacy.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('termination.title')}</h2>
                            <p>{t('termination.content')}</p>
                            <ul className="mt-2">
                                {renderList('termination.reasons')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('updates.title')}</h2>
                            <p>{t('updates.content')}</p>
                            <ul className="mt-2">
                                {renderList('updates.items')}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold">{t('liability.title')}</h2>
                            <p>{t('liability.content')}</p>
                            <ul className="mt-2">
                                {renderList('liability.items')}
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default TOS
