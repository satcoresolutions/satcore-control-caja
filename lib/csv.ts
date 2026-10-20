import type { Movement } from "./types";

function cell(value: string | number): string {
  const text = String(value);
  return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function movementsToCSV(movs: Movement[]): string {
  const header = ["Fecha", "Tipo", "Concepto", "Categoría", "Cuenta", "Entrada", "Salida", "Nota"];
  const sorted = [...movs].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.createdAt - b.createdAt));
  const rows = sorted.map((m) =>
    [
      m.date,
      m.kind === "in" ? "Entrada" : "Salida",
      m.concept,
      m.category,
      m.account,
      m.kind === "in" ? m.amount : "",
      m.kind === "out" ? m.amount : "",
      m.note,
    ]
      .map(cell)
      .join(",")
  );
  // BOM para que Excel respete las tildes
  return "﻿" + [header.join(","), ...rows].join("\n");
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
