'use client';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트되었는지 확인 (hydration 방지)
  useEffect(() => {
    setMounted(true);
    // localStorage에서 현재 테마 읽기
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // 시스템 테마 감지
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
    }
  }, []);

  // 테마 변경 함수
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // DOM에 테마 클래스 적용
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // localStorage에 저장
    localStorage.setItem('theme', newTheme);
  };

  // Hydration 방지용 렌더링
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-label={`현재 ${theme === 'dark' ? '다크' : '라이트'} 모드. ${theme === 'dark' ? '라이트' : '다크'} 모드로 전환하려면 클릭하세요.`}
    >
      {/* 아이콘 애니메이션 */}
      <div className="relative w-5 h-5 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: 0, opacity: theme === 'dark' ? 1 : 0 }}
          animate={{
            rotate: theme === 'dark' ? 0 : 180,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Moon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: -180, opacity: theme === 'light' ? 1 : 0 }}
          animate={{
            rotate: theme === 'light' ? 0 : 180,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Sun className="w-5 h-5 text-yellow-500" />
        </motion.div>
      </div>

      {/* 배경 애니메이션 효과 */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        whileTap={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(250, 204, 21, 0.3) 0%, transparent 70%)',
        }}
      />
    </motion.button>
  );
}
