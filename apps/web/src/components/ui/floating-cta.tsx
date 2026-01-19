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
            className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mb-4"
          >
            <div className="bg-gradient-to-r from-[#FF3366] to-[#FF6B9D] p-5 text-white">
              <h3 className="font-bold text-lg">무료 상담 신청</h3>
              <p className="text-white/80 text-sm mt-1">
                AI 전문가가 24시간 내 연락드립니다
              </p>
            </div>
            <div className="p-4 space-y-3">
              <Link
                href="/about/contact"
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#FF3366]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">문의 남기기</div>
                  <div className="text-xs text-gray-500">폼 작성으로 빠른 상담</div>
                </div>
              </Link>
              <a
                href="tel:02-1234-5678"
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#06B6D4]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">전화 상담</div>
                  <div className="text-xs text-gray-500">02-1234-5678</div>
                </div>
              </a>
              <a
                href="https://pf.kakao.com/_hankaebom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-black">카카오톡 상담</div>
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
          transition-all duration-300
          ${isOpen
            ? 'bg-gray-800 rotate-0'
            : 'bg-gradient-to-r from-[#FF3366] to-[#FF6B9D] animate-pulse'
          }
        `}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </motion.button>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
        >
          무료 상담 받기 💬
        </motion.div>
      )}
    </div>
  );
}
