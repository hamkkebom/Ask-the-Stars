'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import {
  Star, Video, Megaphone, GraduationCap,
  Mail, MapPin, Phone,
  Twitter, Youtube, Instagram, Linkedin
} from 'lucide-react';

const services = [
  { label: 'Stars (프리랜서)', href: '/stars', icon: <Star className="w-4 h-4" aria-hidden="true" /> },
  { label: 'Studio (영상 제작)', href: '/studio', icon: <Video className="w-4 h-4" aria-hidden="true" /> },
  { label: 'Marketing (대행)', href: '/marketing', icon: <Megaphone className="w-4 h-4" aria-hidden="true" /> },
  { label: 'Education (교육)', href: '/education', icon: <GraduationCap className="w-4 h-4" aria-hidden="true" /> },
];

const company = [
  { label: '회사 소개', href: '/about' },
  { label: '비전', href: '/about/vision' },
  { label: '연혁', href: '/about/history' },
  { label: '기업문화', href: '/about/culture' },
  { label: '연락처', href: '/about/contact' },
];

const support = [
  { label: '고객센터', href: '/help' },
  { label: 'FAQ', href: '/help/faq' },
  { label: '뉴스룸', href: '/news' },
];

const legal = [
  { label: '이용약관', href: '/help/terms' },
  { label: '개인정보처리방침', href: '/help/privacy' },
];

const socials = [
  { label: 'Twitter', href: 'https://twitter.com', icon: <Twitter className="w-5 h-5" aria-hidden="true" /> },
  { label: 'YouTube', href: 'https://youtube.com', icon: <Youtube className="w-5 h-5" aria-hidden="true" /> },
  { label: 'Instagram', href: 'https://instagram.com', icon: <Instagram className="w-5 h-5" aria-hidden="true" /> },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5" aria-hidden="true" /> },
];

export function MainFooter() {
  return (
    <footer className="relative bg-background border-t border-white/5">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl">🌟</span>
              <span className="text-2xl font-bold text-white tracking-tight">
                함께봄
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              AI 기반 영상 제작 인재 생태계. 프리랜서 150명+와 함께하는 영상 협업 플랫폼입니다.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>contact@hamkkebom.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>02-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>서울특별시 강남구</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">회사</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">고객지원</h4>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 함께봄. All rights reserved.
            </p>
            <div className="flex gap-4">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <m.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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
