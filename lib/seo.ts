/**
 * Configuración central de SEO.
 * Define NEXT_PUBLIC_SITE_URL en producción.
 */
export const SITE = {
  name: "Control de caja",
  brand: "SatCore Solutions",

  description:
    "Lleva el control de tus ingresos, gastos y transferencias en un solo lugar. Consulta saldos, revisa movimientos por periodos, registra saldos iniciales y exporta tus datos a CSV.",

  shortDescription:
    "Controla ingresos, gastos, transferencias y saldos de forma sencilla.",

  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/+$/,
    "",
  ),

  locale: "es_CO",
  language: "es-CO",
  themeColor: "#132A8E",

  keywords: [
    "control de caja",
    "control de ingresos y gastos",
    "registro de movimientos de caja",
    "control de efectivo",
    "control de cuentas bancarias",
    "gestión de ingresos",
    "registro de gastos",
    "control de transferencias",
    "seguimiento de saldos",
    "arqueo de caja",
    "resumen financiero",
    "control financiero personal",
    "control de caja para negocios",
    "gestión de efectivo para pequeños negocios",
    "exportar movimientos a CSV",
    "SatCore Solutions",
  ],
} as const;

/**
 * Convierte una ruta relativa en una URL absoluta.
 */
export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;