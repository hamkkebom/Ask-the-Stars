'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';

export default function StarsSignupPage() {
  const router = useRouter();
  const { signUp, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 유효성 검사
    if (!formData.name || !formData.email || !formData.password) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    const result = await signUp(formData.email, formData.password, {
      role: 'STAR',
      name: formData.name,
    });

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✉️</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">가입 완료!</h2>
        <p className="text-[#aaa] mb-6">
          입력하신 이메일로 인증 링크를 발송했습니다.
          <br />
          이메일을 확인해주세요.
        </p>
        <Link href="/auth/login" className="text-yellow-500 hover:underline">
          로그인 페이지로 이동
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <Link
        href="/auth/signup"
        className="inline-flex items-center gap-1 text-[#aaa] hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        뒤로
      </Link>

      <h1 className="text-2xl font-bold text-white text-center mb-2">
        프리랜서 가입
      </h1>
      <p className="text-[#aaa] text-center mb-8">영상 제작자로 시작하세요</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#aaa] mb-2"
          >
            이름 *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="홍길동"
            className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-yellow-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#aaa] mb-2"
          >
            이메일 *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-yellow-500 transition-colors"
          />
        </div>

        {/* Specialty */}
        <div>
          <label
            htmlFor="specialty"
            className="block text-sm font-medium text-[#aaa] mb-2"
          >
            전문 분야
          </label>
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
          >
            <option value="">선택해주세요</option>
            <option value="editing">영상 편집</option>
            <option value="motion">모션 그래픽</option>
            <option value="3d">3D/VFX</option>
            <option value="color">색보정</option>
            <option value="sound">사운드</option>
            <option value="other">기타</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#aaa] mb-2"
          >
            비밀번호 *
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="8자 이상"
              className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg px-4 py-3 pr-12 text-white placeholder-[#666] focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-[#aaa] mb-2"
          >
            비밀번호 확인 *
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 재입력"
            className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-yellow-500 transition-colors"
          />
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded border-[#3f3f3f]"
          />
          <span className="text-sm text-[#aaa]">
            <Link href="/terms" className="text-yellow-500 hover:underline">
              이용약관
            </Link>{' '}
            및{' '}
            <Link href="/privacy" className="text-yellow-500 hover:underline">
              개인정보처리방침
            </Link>
            에 동의합니다
          </span>
        </label>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              가입 중...
            </>
          ) : (
            '가입하기'
          )}
        </button>
      </form>
    </div>
  );
}
