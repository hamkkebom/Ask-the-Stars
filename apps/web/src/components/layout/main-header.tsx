'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown,
  Star, Video, Megaphone, GraduationCap,
  Users, Briefcase, Award, BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: '스튜디오',
    href: '/studio',
    icon: <Video className="w-4 h-4" aria-hidden="true" />,
    children: [
      { label: '서비스 안내', href: '/studio/services', icon: <BookOpen className="w-4 h-4" aria-hidden="true" /> },
      { label: '공모전', href: '/studio/contests', icon: <Award className="w-4 h-4" aria-hidden="true" /> },
      { label: '제작 의뢰', href: '/studio/request', icon: <Briefcase className="w-4 h-4" aria-hidden="true" /> },
    ],
  },
  {
    label: '마케팅',
    href: '/marketing',
    icon: <Megaphone className="w-4 h-4" aria-hidden="true" />,
  },
  {
    label: '전문가',
    href: '/stars',
    icon: <Star className="w-4 h-4" aria-hidden="true" />,
    children: [
      { label: '대시보드', href: '/stars/dashboard', icon: <Briefcase className="w-4 h-4" aria-hidden="true" /> },
      { label: '프로젝트 보드', href: '/stars/project-board', icon: <Video className="w-4 h-4" aria-hidden="true" /> },
      { label: '포트폴리오', href: '/stars/portfolio', icon: <Award className="w-4 h-4" aria-hidden="true" /> },
    ],
  },
  {
    label: '교육',
    href: '/education',
    icon: <GraduationCap className="w-4 h-4" aria-hidden="true" />,
    children: [
      { label: '설명회', href: '/education/session', icon: <Users className="w-4 h-4" aria-hidden="true" /> },
      { label: '교육 과정', href: '/education/courses', icon: <BookOpen className="w-4 h-4" aria-hidden="true" /> },
    ],
  },
  {
    label: '회사 소개',
    href: '/about',
  },
];

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌟</span>
            <span className="text-xl font-bold text-white tracking-tight">
              함께봄
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg transition-all',
                    'text-slate-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  {item.icon}
                  {item.label}
                  {item.children && (
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      openDropdown === item.label && 'rotate-180'
                    )} aria-hidden="true" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 p-2 rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-xl"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-bold"
                        >
                          {child.icon}
                          {child.label}
                        </Link>
                      ))}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
              aria-label="로그인 페이지로 이동"
            >
              로그인
            </Link>
            <Link
              href="/auth/signup"
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-lg shadow-primary/20"
            >
              시작하기
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-6 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"
                        >
                          {child.icon}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-white bg-primary hover:bg-primary/90 rounded-lg"
                >
                  시작하기
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
