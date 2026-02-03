export default function AboutPage() {
  return (
    <section className="container mx-auto px-6 py-16 space-y-6">
      <h1 className="text-3xl font-bold text-white">About Hankaebom</h1>
      <p className="text-gray-300 max-w-2xl">
        Hankaebom connects creators, clients, and educators to build a complete
        AI video production ecosystem. Explore the platform vision, the talent
        network, and the production workflows designed for real-world delivery.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-white">Creator Network</h2>
          <p className="text-sm text-gray-400 mt-2">
            Curated freelancers covering editing, motion, and storytelling.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-white">Project Pipeline</h2>
          <p className="text-sm text-gray-400 mt-2">
            Structured requests, feedback loops, and delivery milestones.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-white">Learning Hub</h2>
          <p className="text-sm text-gray-400 mt-2">
            Sessions, resources, and mentoring for continuous growth.
          </p>
        </div>
      </div>
    </section>
  );
}
