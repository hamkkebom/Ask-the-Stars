'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { footerLinks } from '@/config/navigation-config';

const socials = [
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: <Twitter className="w-5 h-5" aria-hidden="true" />,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: <Youtube className="w-5 h-5" aria-hidden="true" />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: <Instagram className="w-5 h-5" aria-hidden="true" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
  },
];

export function MainFooter() {
  return (
    <footer className="relative bg-black border-t border-white/5">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl">🌟</span>
              <span className="text-2xl font-bold text-white tracking-tight">
                함께봄
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm text-sm leading-relaxed">
              AI 기반 영상 제작 인재 생태계. 프리랜서 150명+와 함께하는 영상
              협업 플랫폼입니다.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-500">
              <a
                href="mailto:contact@hamkkebom.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>contact@hamkkebom.com</span>
              </a>
              <a
                href="tel:02-123-4567"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>02-123-4567</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>서울특별시 강남구</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              서비스
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              교육
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.education.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              회사
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              고객지원
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-1">뉴스레터 구독</h4>
              <p className="text-sm text-gray-500">
                최신 소식과 교육 정보를 받아보세요.
              </p>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="이메일 주소"
                className="flex-1 md:w-64 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">구독</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2026 함께봄. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/help/terms"
                className="text-sm text-gray-600 hover:text-white transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="/help/privacy"
                className="text-sm text-gray-600 hover:text-white transition-colors"
              >
                개인정보처리방침
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <m.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </m.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
