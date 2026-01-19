'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Film, GraduationCap, Trophy, Megaphone } from 'lucide-react';

interface HeroCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string; // Tailwind class like 'bg-vibrant-cyan' (custom) or hex
  icon: any;
  image?: string; // Background Image URL
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const HeroCard = ({ id, title, subtitle, description, color, icon: Icon, image, href, isActive, isHovered, onHover }: HeroCardProps & { href?: string }) => {
  const CardContent = (
    <motion.div
      className={cn(
        "relative h-full flex flex-col justify-end p-8 overflow-hidden cursor-pointer transition-colors duration-500",
        // Base background is dark, but we might want a colored tint
        "bg-white/5 border-r border-white/5 last:border-r-0"
      )}
      initial={false}
      animate={{
        flex: isHovered && isActive ? 3 : isHovered && !isActive ? 1 : 1,
        opacity: isHovered && !isActive ? 0.3 : 1
      }}
      transition={{ duration: 0.4, ease: "circOut" }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Background Image (Darkened by default, reveals color/brightness on hover) */}
      <div className="absolute inset-0 z-0">
         <Image
            src={image || "/placeholder.jpg"}
            alt={title}
            fill
            className={cn(
                "object-cover transition-all duration-700",
                isActive ? "opacity-40 scale-105" : "opacity-20 scale-100 grayscale"
            )}
            unoptimized
         />
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
      </div>

      {/* Background Color Block (Reveals on Hover) */}
      <motion.div
        className={cn("absolute inset-0 z-0 mix-blend-overlay opacity-0", color)}
        animate={{ opacity: isActive ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <motion.div
          className={cn("w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md mb-4")}
          animate={{
            backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
            scale: isActive ? 1.1 : 1
          }}
        >
            <Icon className="w-6 h-6 text-white" />
        </motion.div>

        <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
          {title}
        </h2>

        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
                height: isActive ? 'auto' : 0,
                opacity: isActive ? 1 : 0
            }}
            className="overflow-hidden"
        >
            <p className="text-white/90 font-medium text-lg leading-relaxed mb-6 max-w-md drop-shadow-md">
                {description}
            </p>
            <button className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all shadow-xl">
                EXPLORE NOW <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>

        {!isActive && (
             <p className="text-white/50 font-medium tracking-widest text-sm uppercase">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );

  if (href) {
      return (
          <Link href={href} className={cn("block h-full", isHovered && !isActive ? "flex-1" : isHovered && isActive ? "flex-[3]" : "flex-1")}>
             {CardContent}
          </Link>
      );
  }

  return CardContent;
};

export function VibrantHero() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

// Image imports (In a real app, these would be static imports or proper URLs)
// For this demo, we assume these are placed in public/images or referenced correctly
// Since we generated them, we will use the artifacts paths for verify, but user might need to move them.
// Let's us placeholders that look like the generated ones if we can't easily link artifacts to public.
// Actually, I'll use standard high-quality Placeholders for stability, OR try to use the artifact paths if I can move them.
// Given constraints, I will use high-quality Unsplash URLs that match the description perfectly to ensure it works immediately without file operations.

  /* Updated Logic: Wrap HeroCard in Link or handle onClick navigation */

  const cards = [
    {
      id: 'contest',
      title: '공모전',
      subtitle: 'Creative Challenge',
      description: '당신의 빛나는 아이디어로 도전하세요! 총 상금 1억원의 주인공은 바로 당신입니다.',
      color: 'bg-[hsl(184,100%,50%)]', // Cyan
      icon: Trophy,
      image: "/images/hero/contest-3d.png",
      href: "/contests"
    },
    {
      id: 'notice',
      title: '한깨봄 소개', // Updated from 공지사항
      subtitle: 'About Us', // Updated
      description: '별들에게 물어봐의 새로운 소식과 주요 업데이트를 가장 먼저 확인하세요.',
      color: 'bg-[hsl(346,100%,61%)]', // Magenta
      icon: Megaphone,
      image: "/images/hero/notice-3d.png",
      href: "/about"
    },
    {
      id: 'education',
      title: 'AI 교육', // Updated from 교육
      subtitle: 'AI Academy',
      description: '전문 상담사가 되기 위한 체계적인 교육 과정. 기초부터 실전까지 마스터하세요.',
      color: 'bg-[hsl(111,100%,54%)]', // Green
      icon: GraduationCap,
      image: "/images/hero/education-3d.png",
      href: "/education"
    }
  ];

  return (
    <section className="w-full h-[60vh] border-b border-white/10 bg-black overflow-hidden flex flex-col md:flex-row font-sans">
      {cards.map(card => (
        <HeroCard
          key={card.id}
          {...card}
          isActive={hoveredId === card.id}
          isHovered={hoveredId !== null}
          onHover={setHoveredId}
        />
      ))}
    </section>
  );
}
