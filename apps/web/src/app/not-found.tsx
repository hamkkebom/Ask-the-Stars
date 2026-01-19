import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
      <p className="mt-2 text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
