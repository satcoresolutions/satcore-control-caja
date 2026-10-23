/**
 * Clases Tailwind compartidas.
 * Replican los patrones de tu CSS anterior (paneles, kpis, botones, tabs, etc.)
 * usando solo los tokens del brand SatCore definidos en global.css.
 *
 * Equivalencias con el CSS viejo:
 *   --bg -> background | --panel -> surface-secondary | --panel-hover -> surface
 *   --line -> border   | --ink -> foreground          | --muted -> text-muted
 *   --accent -> text-primary (verde en .dark) / secondary | --primary -> primary
 */

const btnBase =
  "inline-block cursor-pointer rounded-lg border px-3.5 py-2.5 text-center text-[0.9rem] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

export const ui = {
  stack: "grid gap-4",

  // Contenedores
  panel: "rounded-[10px] border border-border bg-surface-secondary p-5",
  panelHead: "mb-3.5 flex flex-wrap items-center justify-between gap-2.5",
  title: "text-[1.1rem] font-bold text-foreground",
  subtitle: "mb-2.5 mt-5 text-[0.95rem] font-bold uppercase tracking-[0.04em] text-text-primary",

  // Texto
  muted: "text-text-muted",
  mutedSmall: "text-[0.82rem] text-text-muted",
  hint: "mt-1.5 text-[0.82rem] text-text-muted",

  // Botones
  btn: `${btnBase} border-border bg-surface text-foreground hover:border-border-strong hover:bg-border`,
  btnPrimary: `${btnBase} border-primary bg-primary text-white hover:brightness-125`,
  btnGhost: `${btnBase} border-transparent bg-transparent text-text-primary hover:bg-surface`,
  block: "mt-2 w-full",
  link: "cursor-pointer border-none bg-transparent p-0 text-[0.82rem] text-text-primary hover:underline",
  linkDanger: "cursor-pointer border-none bg-transparent p-0 text-[0.82rem] text-danger hover:underline",

  // Formularios
  label: "grid gap-1 text-[0.82rem] text-text-muted",
  input:
    "w-full rounded-lg border border-border bg-background px-2.5 py-2 text-foreground placeholder:text-text-muted",
  grid2: "grid gap-3 sm:grid-cols-2",
  formStack: "grid gap-3",

  // Avisos
  alert: "mb-3 rounded-lg border border-danger/30 bg-danger/10 px-2.5 py-2 text-[0.85rem] text-danger",
  toast:
    "sticky top-2 z-[5] mb-3 rounded-lg border border-success/30 bg-success/10 px-2.5 py-2 text-[0.85rem] text-success shadow-md",

  // Caja de total (el fondo se agrega donde se usa)
  totalBox: "flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5",
  totalLabel: "text-[0.85rem] text-text-muted",
  totalValue: "text-[1.2rem] font-bold tabular-nums",

  // Segmentado (Mesa / Para llevar / Domicilio)
  seg: "grid grid-cols-3 gap-1 rounded-[10px] border border-border bg-background p-1",
  segOff: "cursor-pointer rounded-lg px-2.5 py-2 text-text-muted",
  segOn: "cursor-pointer rounded-lg bg-primary px-2.5 py-2 font-semibold text-white shadow-md",

  tabBadge:
    "ml-2 inline-block min-w-5 rounded-full bg-secondary px-1.5 py-px text-center text-xs font-bold text-black-soft",
} as const;
