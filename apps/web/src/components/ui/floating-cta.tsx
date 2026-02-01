'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export function FloatingCTA() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-72 bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden mb-4 z-[60]"
          >
            <div className="bg-primary p-5 text-primary-foreground font-black">
              <h3 className="text-lg">무료 상담 신청</h3>
              <p className="text-primary-foreground/80 text-sm mt-1">
                AI 전문가가 24시간 내 연락드립니다
              </p>
            </div>
            <div className="p-4 space-y-3">
              <Link
                href="/about/contact"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">
                    문의 남기기
                  </div>
                  <div className="text-xs text-slate-400">
                    폼 작성으로 빠른 상담
                  </div>
                </div>
              </Link>
              <a
                href="tel:02-1234-5678"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">전화 상담</div>
                  <div className="text-xs text-slate-400">02-1234-5678</div>
                </div>
              </a>
              <a
                href="https://pf.kakao.com/_hamkkebom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                  <MessageCircle
                    className="w-5 h-5 text-black"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm text-black">
                    카카오톡 상담
                  </div>
                  <div className="text-xs text-black/60">실시간 채팅 상담</div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          w-16 h-16 rounded-full shadow-2xl flex items-center justify-center
          transition-all duration-300 z-50
          ${
            isOpen
              ? 'bg-slate-800 rotate-0'
              : 'bg-primary shadow-lg shadow-primary/20'
          }
        `}
        aria-label={isOpen ? '상담 메뉴 닫기' : '상담 메뉴 열기'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" aria-hidden="true" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />
        )}
      </motion.button>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 border border-white/10 px-4 py-2 rounded-full shadow-lg text-sm font-bold text-white"
        >
          무료 상담 받기 💬
        </motion.div>
      )}
    </div>
  );
}
