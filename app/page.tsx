import Image from "next/image";
import CajaApp from "@/components/CajaApp";

export default function Home() {
  return (
    <main className="container">
      <header className="top">
        <div className="brand">
          <Image
            src="/logo.png"
            alt="SatCore Solutions"
            width={200}
            height={65}
            className="brand-logo"
            priority
          />

          <div>
            <div className="brand-tagline">
              Soluciones digitales seguras, accesibles y funcionales para todos.
            </div>
          </div>
        </div>

        <div className="top-content">
          <h1>Control de caja</h1>
          <p className="muted">
            Registra lo que entra y lo que sale, y mira cuánto tienes en caja y
            en el banco.
          </p>
        </div>
      </header>

      <CajaApp />
    </main>
  );
}
