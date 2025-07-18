import FruitGallery from '@/components/FruitGallery'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
export const runtime = 'edge'

export default function Home() {
    const t = useTranslations('page')

    return (
        <div className="relative">
            {/* Hero Section */}
            <section id="calculator" className="relative z-10 px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                        {t('hero.subtitle')}
                    </p>
                </div>
                <FruitGallery />
            </section>

            {/* Problem/Solution Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-lg">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                            {t('problemSolution.title')}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            {t('problemSolution.description')}
                        </p>
                        <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6 shadow-md">
                            <h3 className="text-2xl font-bold text-purple-700">
                                {t('problemSolution.solutionTitle')}
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
            {/* Features Section */}
            <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                        {t('features.title')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('features.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <div className="w-6 h-6 bg-purple-600 rounded"></div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">
                                {t(`features.items.${index}.title`)}
                            </h3>
                            <p className="text-gray-600">
                                {t(`features.items.${index}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                        {t('howItWorks.title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[0, 1, 2].map((index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-lg text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <span className="text-2xl font-bold text-purple-600">{index + 1}</span>
                            </div>
                            <div className="text-sm font-medium text-purple-600 mb-2">
                                {t(`howItWorks.steps.${index}.step`)}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800">
                                {t(`howItWorks.steps.${index}.title`)}
                            </h3>
                            <p className="text-gray-600">
                                {t(`howItWorks.steps.${index}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                        {t('socialProof.title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[0, 1].map((index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-lg">
                            <div className="mb-6">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-800 text-lg italic mb-4">
                                    &ldquo;{t(`socialProof.testimonials.${index}.quote`)}&rdquo;
                                </p>
                            </div>
                            <div>
                                <div className="font-bold text-gray-800">
                                    {t(`socialProof.testimonials.${index}.author`)}
                                </div>
                                <div className="text-purple-600 text-sm">
                                    {t(`socialProof.testimonials.${index}.source`)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Live Trackers Section */}
            {/* <section id="trackers" className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                        {t('liveTrackers.title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🌦️</span>
                            <h3 className="text-xl font-bold text-gray-800">{t('liveTrackers.weather.title')}</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="text-gray-600">Status: <span className="font-medium text-gray-800">Sunny</span></div>
                            <div className="text-gray-600">Next: <span className="font-medium text-gray-800">Thunderstorm in 2h 15m</span></div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🌱</span>
                            <h3 className="text-xl font-bold text-gray-800">{t('liveTrackers.seedShop.title')}</h3>
                        </div>
                        <div className="text-gray-600">Refreshes in: <span className="font-medium text-gray-800">4h 32m</span></div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">⚙️</span>
                            <h3 className="text-xl font-bold text-gray-800">{t('liveTrackers.gearShop.title')}</h3>
                        </div>
                        <div className="text-gray-600">Refreshes in: <span className="font-medium text-gray-800">1h 47m</span></div>
                    </div>
                </div>
            </section> */}

            {/* FAQ Section */}
            <section id="faq" className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                        {t('faq.title')}
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">
                                {t(`faq.questions.${index}.q`)}
                            </h3>
                            <p className="text-gray-600">
                                {t(`faq.questions.${index}.a`)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-12 shadow-lg text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                        {t('finalCta.title')}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        {t('finalCta.description')}
                    </p>
                    <Link href="/" className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-lg">
                        {t('finalCta.buttonText')}
                    </Link>
                </div>
            </section>
        </div>
    )
}
