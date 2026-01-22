"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogIn, ArrowUpRight, Menu, X, ChevronRight, ChevronDown, User, LayoutDashboard, FolderKanban, Wallet, Settings, LogOut, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock auth state - replace with actual auth
const useMockAuth = () => {
  const [isLoggedIn] = useState(true); // Set to true to test user menu
  const [user] = useState({
    name: "별님",
    email: "star@example.com",
    role: "freelancer", // freelancer | counselor | admin
    avatar: null,
  });
  return { isLoggedIn, user };
};

export function AwardHeader() {
  const pathname = usePathname();
  const isCompanySite = pathname.startsWith("/about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isLoggedIn, user } = useMockAuth();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClick = () => setIsUserMenuOpen(false);
    if (isUserMenuOpen) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [isUserMenuOpen]);

  const serviceMenuItems = [
    { label: "서비스 소개", href: "/intro" },
    { label: "영상 둘러보기", href: "/videos" },
    { label: "상담사 연결", href: "/counselors" },
    { label: "커뮤니티", href: "/community" },
    { label: "공지사항", href: "/notice" },
  ];

  const companyMenuItems = [
    { label: "회사소개", href: "/about" },
    { label: "비전", href: "/about/vision" },
    { label: "연혁", href: "/about/history" },
    { label: "문화", href: "/about/culture" },
    { label: "문의하기", href: "/about/contact" },
  ];

  const userMenuItems = user.role === "freelancer" ? [
    { label: "내 대시보드", href: "/stars/dashboard", icon: LayoutDashboard },
    { label: "내 프로젝트", href: "/stars/my-projects", icon: FolderKanban },
    { label: "수입 관리", href: "/stars/earnings", icon: Wallet },
    { label: "설정", href: "/settings/profile", icon: Settings },
  ] : user.role === "admin" ? [
    { label: "관리자 패널", href: "/admin", icon: LayoutDashboard },
    { label: "설정", href: "/settings/profile", icon: Settings },
  ] : [
    { label: "내 대시보드", href: "/counselor/dashboard", icon: LayoutDashboard },
    { label: "설정", href: "/settings/profile", icon: Settings },
  ];

  const menuItems = isCompanySite ? companyMenuItems : serviceMenuItems;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300",
          isCompanySite
            ? "bg-white/90 border-gray-200 text-black"
            : "bg-black/80 border-white/10 text-white",
          isScrolled && "shadow-lg",
          isScrolled && isCompanySite && "bg-white/95",
          isScrolled && !isCompanySite && "bg-black/95"
        )}
      >
        <div className={cn(
          "container relative flex max-w-screen-2xl items-center justify-between px-4 sm:px-8 transition-all duration-300",
          isScrolled ? "h-14" : "h-16"
        )}>

          {/* Left Side: Logo + Mobile Menu Button */}
          <div className="flex items-center gap-3 z-10">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2 -ml-2 rounded-lg transition-colors",
                isCompanySite ? "hover:bg-gray-100" : "hover:bg-white/10"
              )}
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <Link href={isCompanySite ? "/about" : "/"} className={cn(
              "font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity",
              isCompanySite ? "text-black" : "text-white"
            )}>
              {isCompanySite ? "한깨봄" : "별들에게 물어봐"}
            </Link>
          </div>

          {/* Center: Navigation Menu - Desktop Only */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 text-sm font-medium">
            {menuItems.map((item) => {
              const isActive = isCompanySite && (
                item.href === "/about"
                  ? pathname === "/about"
                  : pathname.startsWith(item.href)
              );

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "transition-colors relative",
                    isCompanySite
                      ? (isActive ? "text-primary font-bold" : "text-gray-400 hover:text-white")
                      : "text-white/70 hover:text-white hover:font-bold"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="gnbActiveTab"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-4 z-10">
            {isCompanySite ? (
              <Link
                href="/videos"
                className="text-sm font-medium px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center gap-1"
              >
                <span className="hidden sm:inline">서비스 바로가기</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            ) : isLoggedIn ? (
              /* User Menu (Logged In) */
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-sm">
                    {user.name[0]}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-white">{user.name}</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-white/70 transition-transform",
                    isUserMenuOpen && "rotate-180"
                  )} />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="p-4 border-b border-white/10">
                        <p className="font-bold text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-yellow-400 font-medium">프리랜서</span>
                        </div>
                      </div>

                      {/* Quick Links */}
                      <div className="py-2">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-white/10 p-2">
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <LogOut className="w-4 h-4" />
                          로그아웃
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Login/Signup (Not Logged In) */
              <>
                <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white flex items-center gap-2 transition-colors">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">로그인</span>
                </Link>
                <Link href="/signup" className="hidden sm:flex text-sm font-bold px-5 py-2.5 bg-white text-black rounded-full hover:bg-white/90 transition-colors shadow-lg shadow-white/5">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "fixed top-[56px] left-0 right-0 z-40 md:hidden border-b shadow-2xl",
                isCompanySite ? "bg-white border-gray-200" : "bg-gray-900 border-gray-800"
              )}
            >
              <nav className="container max-w-screen-2xl px-4 py-4">
                {/* User Info (Mobile) */}
                {isLoggedIn && (
                  <div className={cn(
                    "mb-4 pb-4 border-b flex items-center gap-3",
                    isCompanySite ? "border-gray-200" : "border-gray-700"
                  )}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className={cn("font-bold", isCompanySite ? "text-black" : "text-white")}>{user.name}</p>
                      <Link
                        href="/stars/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm text-primary hover:underline"
                      >
                        내 대시보드 →
                      </Link>
                    </div>
                  </div>
                )}

                <ul className="space-y-1">
                  {menuItems.map((item, idx) => {
                    const isActive = isCompanySite && (
                      item.href === "/about"
                        ? pathname === "/about"
                        : pathname.startsWith(item.href)
                    );

                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between py-4 px-4 rounded-xl transition-colors",
                            isCompanySite
                              ? isActive
                                ? "bg-[#FF3366]/10 text-[#FF3366] font-bold"
                                : "text-gray-700 hover:bg-gray-100"
                              : isActive
                                ? "bg-white/10 text-white font-bold"
                                : "text-gray-300 hover:bg-white/5"
                          )}
                        >
                          <span className="text-lg">{item.label}</span>
                          <ChevronRight className={cn(
                            "w-5 h-5",
                            isActive ? "opacity-100" : "opacity-40"
                          )} />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  {isCompanySite ? (
                    <Link
                      href="/about/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#FF3366] to-[#FF6B9D] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                      무료 상담 신청
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  ) : isLoggedIn ? (
                    <Link
                      href="/stars/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      내 대시보드로 이동
                    </Link>
                  ) : (
                    <div className="flex gap-3">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 py-4 text-center border border-gray-600 text-white font-medium rounded-xl hover:bg-white/5 transition-colors"
                      >
                        로그인
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 py-4 text-center bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        회원가입
                      </Link>
                    </div>
                  )}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

