import { SimpleHeader } from "@/components/layout/simple-header";
import { MainFooter } from "@/components/layout/main-footer";
import { FloatingCTA } from "@/components/ui/floating-cta";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SimpleHeader />
      <main className="min-h-screen bg-black text-white pt-16">
        {children}
      </main>
      <MainFooter />
      <FloatingCTA />
    </>
  );
}

