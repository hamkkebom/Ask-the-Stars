'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
  { name: "삼성전자", logo: "/images/clients/samsung.svg" },
  { name: "LG", logo: "/images/clients/lg.svg" },
  { name: "현대", logo: "/images/clients/hyundai.svg" },
  { name: "SK", logo: "/images/clients/sk.svg" },
  { name: "네이버", logo: "/images/clients/naver.svg" },
  { name: "카카오", logo: "/images/clients/kakao.svg" },
];

export function ClientLogos() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">
            Trusted by Leading Companies
          </p>
          <h3 className="text-2xl font-bold mt-2">
            대한민국 대표 기업들이 선택한 파트너
          </h3>
        </motion.div>

        {/* Infinite scroll animation */}
        <div className="relative">
          <div className="flex animate-scroll">
            {[...clients, ...clients].map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="flex-shrink-0 w-40 h-20 mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-gray-400 hover:text-gray-700 transition-colors">
                  {client.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
