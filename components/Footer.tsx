'use client';

import { useTranslations } from 'next-intl';
import VioletCorn from '@/public/favicon.svg'
import Image from 'next/image'
import Link from 'next/link';
export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative z-10 w-full mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image src={VioletCorn} alt="Violet Corn" width={64} height={64} />
                <h3 className="text-xl font-bold text-gray-800">Grow a Garden Calculator</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t('description')}
              </p>
            </div>

            {/* <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4">Tools</h4>
              <ul className="space-y-2">
                <li><a href="#calculator" className="text-gray-600 hover:text-purple-600 transition-colors">Crop Calculator</a></li>
                <li><a href="#trackers" className="text-gray-600 hover:text-purple-600 transition-colors">Live Trackers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">WFL Trading</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Growth Timer</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Bug Reports</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Feature Requests</a></li>
              </ul>
            </div> */}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Grow a Garden Calculator. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">{t('privacy-policy')}</Link>
              <Link href="/tos" className="text-gray-600 hover:text-purple-600 transition-colors">{t('terms-of-service')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 