export type Kind = "in" | "out";
export type Account = "Efectivo" | "Banco";

export const ACCOUNTS: Account[] = ["Efectivo", "Banco"];

/** Categoría especial: mover plata entre Efectivo y Banco no es ingreso ni gasto. */
export const TRANSFER = "Traslado entre cuentas";
/** Categoría usada por el arqueo para corregir diferencias. */
export const ADJUST = "Ajuste de caja";

export const CATEGORIES_IN: string[] = [
  "Ventas",
  "Cobro de cartera",
  "Aporte del dueño",
  "Préstamo recibido",
  "Otros ingresos",
  ADJUST,
];

export const CATEGORIES_OUT: string[] = [
  "Proveedores / compras",
  "Nómina",
  "Arriendo",
  "Servicios públicos",
  "Transporte",
  "Impuestos",
  "Publicidad",
  "Retiro del dueño",
  "Otros gastos",
  ADJUST,
];

export interface Movement {
  id: string;
  createdAt: number;
  date: string; // YYYY-MM-DD
  kind: Kind;
  concept: string;
  category: string;
  amount: number; // siempre positivo
  account: Account;
  note: string;
  /** Une las dos patas de un traslado entre cuentas. */
  pairId?: string;
}

export type Openings = Record<Account, number>;
