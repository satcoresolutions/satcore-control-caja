import type { Movement, Openings } from "./types";
import { TRANSFER } from "./types";
import { addDays, toDate, todayISO } from "./dates";
import { uid } from "./format";

export const DEMO_OPENINGS: Openings = { Efectivo: 300000, Banco: 1500000 };

/** ~45 días de movimientos de ejemplo (determinista) para explorar la app. */
export function demoMovements(): Movement[] {
  let seed = 11;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const today = todayISO();
  const now = Date.now();
  const out: Movement[] = [];
  let n = 0;
  let cash = DEMO_OPENINGS.Efectivo;

  const add = (back: number, m: Omit<Movement, "id" | "createdAt" | "date" | "note">) => {
    if (m.account === "Efectivo") cash += m.kind === "in" ? m.amount : -m.amount;
    out.push({ ...m, id: uid(), createdAt: now - back * 86_400_000 + n++, date: addDays(today, -back), note: "" });
  };

  for (let back = 44; back >= 0; back--) {
    const date = addDays(today, -back);
    const dow = toDate(date).getDay();
    const day = Number(date.slice(8, 10));

    if (dow !== 0) {
      const sales = Math.floor(rand() * 3) + 1;
      for (let i = 0; i < sales; i++) {
        add(back, {
          kind: "in",
          concept: "Ventas del día",
          category: "Ventas",
          amount: Math.round((60000 + rand() * 240000) / 1000) * 1000,
          account: rand() > 0.35 ? "Efectivo" : "Banco",
        });
      }
    }

    if (dow === 1) {
      add(back, {
        kind: "out",
        concept: "Compra de mercancía",
        category: "Proveedores / compras",
        amount: Math.round((200000 + rand() * 300000) / 1000) * 1000,
        account: "Banco",
      });
    }
    if (day === 5) add(back, { kind: "out", concept: "Arriendo del local", category: "Arriendo", amount: 900000, account: "Banco" });
    if (day === 10) add(back, { kind: "out", concept: "Servicios (luz, agua, internet)", category: "Servicios públicos", amount: 185000, account: "Banco" });
    if (day === 15 || day === 30) add(back, { kind: "out", concept: "Pago nómina", category: "Nómina", amount: 700000, account: "Banco" });
    if (rand() > 0.6) {
      add(back, {
        kind: "out",
        concept: "Transporte y domicilios",
        category: "Transporte",
        amount: Math.round((8000 + rand() * 30000) / 500) * 500,
        account: "Efectivo",
      });
    }

    // Consignación semanal de efectivo al banco (traslado entre cuentas)
    // (se consigna lo que sobre dejando un colchón de $150.000 en la caja)
    const toDeposit = Math.floor((cash - 150000) / 10000) * 10000;
    if (dow === 6 && toDeposit > 0) {
      const pairId = uid();
      add(back, { kind: "out", concept: "Consignación al banco", category: TRANSFER, amount: toDeposit, account: "Efectivo", pairId });
      add(back, { kind: "in", concept: "Consignación al banco", category: TRANSFER, amount: toDeposit, account: "Banco", pairId });
    }
  }
  return out;
}
