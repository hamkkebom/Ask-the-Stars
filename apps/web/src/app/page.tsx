import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="text-xl font-bold">🌟 별들에게 물어봐</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              시작하기
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            사주천궁
            <br />
            <span className="text-primary">영상 협업 플랫폼</span>
          </h1>
          <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
            프리랜서와 클라이언트를 연결하는 B2B2C 영상 제작 플랫폼.
            <br />
            실시간 피드백과 원활한 협업으로 최고의 결과물을 만들어보세요.
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              무료로 시작하기
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              더 알아보기
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <div className="mb-4 text-4xl">🎬</div>
              <h3 className="mb-2 text-xl font-semibold">영상 리뷰</h3>
              <p className="text-muted-foreground">
                타임스탬프 기반 피드백과 화면 마킹으로 정확한 수정 요청
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <div className="mb-4 text-4xl">💬</div>
              <h3 className="mb-2 text-xl font-semibold">실시간 협업</h3>
              <p className="text-muted-foreground">
                WebSocket 기반 실시간 알림으로 빠른 커뮤니케이션
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <div className="mb-4 text-4xl">💰</div>
              <h3 className="mb-2 text-xl font-semibold">투명한 정산</h3>
              <p className="text-muted-foreground">
                체계적인 정산 시스템으로 안전하고 투명한 수익 관리
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 별들에게 물어봐. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              이용약관
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
