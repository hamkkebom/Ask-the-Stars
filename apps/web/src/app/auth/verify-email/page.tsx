import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-500" />
      </div>

      <h1 className="text-2xl font-bold text-white mb-2">
        이메일 인증 완료!
      </h1>

      <p className="text-[#aaa] mb-8">
        계정이 성공적으로 활성화되었습니다.<br />
        이제 로그인하여 서비스를 이용할 수 있습니다.
      </p>

      <Link
        href="/auth/login"
        className="inline-flex px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
      >
        로그인하기
      </Link>
    </div>
  );
}
