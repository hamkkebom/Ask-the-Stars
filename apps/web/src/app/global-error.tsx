'use client';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-white`}>
        <div className="flex min-h-screen flex-col items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">💥</div>

            <h1 className="text-3xl font-bold mb-2">
              심각한 오류가 발생했습니다
            </h1>

              애플리케이션에 예상치 못한 문제가 발생했습니다.
              <br />
              <span className="text-red-400 font-mono text-xs block mt-2 bg-slate-900 p-2 rounded">
                {error.message}
              </span>
              <br />
              페이지를 새로고침하거나 잠시 후 다시 시도해주세요.

            {error.digest && (
              <p className="text-xs text-slate-500 mb-6 font-mono">
                오류 코드: {error.digest}
              </p>
            )}

            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
