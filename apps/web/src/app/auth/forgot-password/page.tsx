'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📧</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">이메일을 확인하세요</h2>
        <p className="text-[#aaa] mb-6">
          {email}로 비밀번호 재설정 링크를<br />발송했습니다.
        </p>
        <Link href="/auth/login" className="text-yellow-500 hover:underline">
          로그인 페이지로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/auth/login" className="inline-flex items-center gap-1 text-[#aaa] hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        로그인으로 돌아가기
      </Link>

      <h1 className="text-2xl font-bold text-white text-center mb-2">비밀번호 찾기</h1>
      <p className="text-[#aaa] text-center mb-8">가입하신 이메일 주소를 입력하세요</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#aaa] mb-2">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-yellow-500"
            disabled={loading}
          />
        </div>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" />전송 중...</> : '재설정 링크 보내기'}
        </button>
      </form>
    </div>
  );
}
