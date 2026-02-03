export default function SessionInfoPage() {
  return (
    <section className="container mx-auto px-6 py-16 space-y-6">
      <h1 className="text-3xl font-bold text-white">Session Information</h1>
      <p className="text-gray-300 max-w-2xl">
        Get an overview of upcoming sessions, schedule details, and how to
        prepare your portfolio before joining. Sessions are designed to align
        creators and clients on scope, deadlines, and delivery standards.
      </p>
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-2 text-sm text-gray-300">
          <span>Format: Live onboarding + Q&A</span>
          <span>Duration: 60 minutes</span>
          <span>Coverage: Briefing, workflow, review cadence</span>
        </div>
      </div>
    </section>
  );
}
