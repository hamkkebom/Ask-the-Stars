export default function MoonDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">관리팀 대시보드</h1>
        <p className="text-muted-foreground">
          프로젝트 현황과 팀 활동을 한눈에 확인하세요.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            진행 중 프로젝트
          </div>
          <div className="mt-2 text-3xl font-bold">24</div>
          <p className="mt-1 text-xs text-muted-foreground">
            지난 주 대비 +12%
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            활성 프리랜서
          </div>
          <div className="mt-2 text-3xl font-bold">156</div>
          <p className="mt-1 text-xs text-muted-foreground">
            지난 주 대비 +8%
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            대기 중 피드백
          </div>
          <div className="mt-2 text-3xl font-bold">43</div>
          <p className="mt-1 text-xs text-muted-foreground">
            평균 응답 시간: 2시간
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">
            이번 달 정산
          </div>
          <div className="mt-2 text-3xl font-bold">₩12.5M</div>
          <p className="mt-1 text-xs text-muted-foreground">
            지난 달 대비 +23%
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border">
        <div className="border-b p-4">
          <h2 className="font-semibold">최근 활동</h2>
        </div>
        <div className="divide-y">
          {[
            { action: '새 프로젝트 등록', user: '김상담', time: '5분 전' },
            { action: '영상 제출 완료', user: '이별님', time: '15분 전' },
            { action: '피드백 승인', user: '박피드백', time: '1시간 전' },
            { action: '정산 처리 완료', user: '정산팀', time: '2시간 전' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.user}</p>
              </div>
              <span className="text-sm text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
