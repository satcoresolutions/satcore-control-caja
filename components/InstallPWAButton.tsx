"use client";

import { useEffect, useState } from "react";
import { ui } from "@/lib/constants";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWAButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
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
      await deferred.userChoice;
      setDeferred(null);
    } else {
      setShowHelp((v) => !v);
    }
  };

  return (
    <div className="relative">
      <button type="button" onClick={install} className={ui.btnAccent}>
        📲 Instalar app
      </button>
      {showHelp && (
        <div className="absolute right-0 z-1500 mt-2 w-64 rounded-lg border border-border-strong bg-surface p-3 text-xs shadow-xl">
          En iPhone: toca el botón <strong>Compartir</strong> de Safari y luego
          <strong> “Añadir a pantalla de inicio”</strong>.
        </div>
      )}
    </div>
  );
}
