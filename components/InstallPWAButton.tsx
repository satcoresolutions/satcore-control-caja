
"use client";

import { useEffect, useState } from "react";
import { ui } from "@/lib/ui";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWAButton() {
  const [deferred, setDeferred] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;

    setInstalled(standalone);
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
      setShowHelp(false);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;
  if (!deferred && !isIOS) return null;

  const install = async () => {
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;

      if (choice.outcome === "accepted") {
        setShowHelp(false);
      }

      setDeferred(null);
      return;
    }

    setShowHelp((current) => !current);
  };

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={install}
        className={ui.btnPrimary}
        aria-expanded={showHelp}
        aria-haspopup="true"
      >
        <span aria-hidden="true">📲</span> Instalar app
      </button>

      {showHelp && (
        <div
          role="status"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-border-strong bg-surface p-3 text-sm leading-relaxed text-foreground shadow-xl"
        >
          <p className="mb-1 font-semibold">Instalar en iPhone o iPad</p>
          <p className="text-text-muted">
            Abre esta página en Safari, toca el botón Compartir y selecciona
            «Añadir a pantalla de inicio».
          </p>
        </div>
      )}
    </div>
  );
}
