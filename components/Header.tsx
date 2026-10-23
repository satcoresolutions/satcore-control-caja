import Image from "next/image";

import InstallPWAButton from "./InstallPWAButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="sticky top-0 z-1100 border-b border-border bg-background/90 backdrop-blur print:hidden">
            <div className="satcore-container flex items-center justify-between gap-3 py-3">
                {/* Identidad */}
                <div className="flex min-w-0 items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Logo de SatCore Solutions"
                        width={200}
                        height={65}
                        priority
                        className="h-auto w-32 shrink-0 object-contain sm:w-50"
                    />

                    <div className="hidden leading-tight sm:block">
                        <p className="text-base font-bold text-text-primary">
                            Control de caja
                        </p>
                        <p className="text-xs text-text-muted">
                            SatCore Solutions
                        </p>
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex shrink-0 items-center gap-2">
                    <InstallPWAButton />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}