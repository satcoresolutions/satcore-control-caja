
import CajaApp from "@/components/CajaApp";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
          <Header />

          <section
            aria-label="Panel de control de caja"
            className="min-w-0"
          >
            <CajaApp />
          </section>
        </div>
      </div>
    </main>
  );
}
