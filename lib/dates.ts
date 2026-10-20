// Todas las fechas se manejan como texto YYYY-MM-DD en hora local.

export function toDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y || 1970, (m || 1) - 1, d || 1, 12); // mediodía para evitar saltos por horario de verano
}

export function toISO(d: Date): string {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function todayISO(): string {
  return toISO(new Date());
}

export function addDays(iso: string, n: number): string {
  const d = toDate(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

export function diffDays(from: string, to: string): number {
  return Math.round((toDate(to).getTime() - toDate(from).getTime()) / 86_400_000);
}

export function startOfMonth(iso: string): string {
  return iso.slice(0, 8) + "01";
}

export function fmtShort(iso: string): string {
  return toDate(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short" }).replace(".", "");
}

export function fmtLong(iso: string): string {
  const s = toDate(iso).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function fmtMonthKey(key: string): string {
  return toDate(`${key}-01`)
    .toLocaleDateString("es-CO", { month: "short", year: "2-digit" })
    .replace(".", "");
}
