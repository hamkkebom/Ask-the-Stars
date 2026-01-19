import { AwardHeader } from "@/components/layout/award-header";
import { FloatingCTA } from "@/components/ui/floating-cta";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AwardHeader />
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
      <FloatingCTA />
    </>
  );
}
