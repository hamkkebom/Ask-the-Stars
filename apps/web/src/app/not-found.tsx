import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f0f1a] text-white">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-pulse bg-primary/20 blur-3xl rounded-full" />
        <Rocket className="relative z-10 w-24 h-24 text-primary animate-bounce decoration-slice" />
      </div>

      <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 mb-2">
        404
      </h1>
      <h2 className="text-3xl font-bold mb-4">우주 미아가 되셨나요?</h2>
      <p className="text-gray-400 text-center max-w-md mb-8 leading-relaxed">
        요청하신 페이지가 블랙홀로 빨려들어갔거나,<br />
        아직 발견되지 않은 미지의 행성입니다.
      </p>

      <Link
        href="/"
        className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary font-bold text-white transition-all hover:bg-primary/90 hover:scale-105 shadow-[0_0_20px_rgba(255,51,102,0.4)]"
      >
        <span>본부로 귀환하기</span>
        <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
