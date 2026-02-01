import Link from 'next/link';
import { Users, Briefcase } from 'lucide-react';

export default function SignupPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white text-center mb-2">
        회원가입
      </h1>
      <p className="text-[#aaa] text-center mb-8">가입 유형을 선택해주세요</p>

      <div className="space-y-4">
        {/* 프리랜서 가입 */}
        <Link
          href="/auth/signup/stars"
          className="block p-6 bg-[#121212] border border-[#3f3f3f] rounded-xl hover:border-yellow-500 transition-colors group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-yellow-500/20 transition-colors">
              <Users className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                프리랜서 (Star)
              </h2>
              <p className="text-sm text-[#aaa]">
                영상 제작자로 가입하여 프로젝트를 수주하고 수입을 관리하세요
              </p>
            </div>
          </div>
        </Link>

        {/* 클라이언트 가입 */}
        <Link
          href="/auth/signup/client"
          className="block p-6 bg-[#121212] border border-[#3f3f3f] rounded-xl hover:border-blue-500 transition-colors group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
              <Briefcase className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                클라이언트
              </h2>
              <p className="text-sm text-[#aaa]">
                영상 제작을 의뢰하고 진행 상황을 확인하세요
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Login Link */}
      <div className="mt-8 text-center text-sm text-[#aaa]">
        이미 계정이 있으신가요?{' '}
        <Link href="/auth/login" className="text-yellow-500 hover:underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
