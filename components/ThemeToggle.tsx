"use client";

import { useEffect, useState } from "react";
import { THEME_KEY } from "@/lib/constants";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;

    document.documentElement.classList.toggle("dark", next);
    setDark(next);

    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // Ignorar errores de almacenamiento.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        dark
          ? "Cambiar a modo claro"
          : "Cambiar a modo oscuro"
      }
      title={
        dark
          ? "Cambiar a modo claro"
          : "Cambiar a modo oscuro"
      }
      className="
        inline-flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-border
        bg-surface
        text-base
        transition
        hover:bg-surface-secondary
        focus:outline-none
        focus:ring-2
        focus:ring-primary/30
        active:scale-95
      "
    >
      <span aria-hidden="true">
        {dark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
