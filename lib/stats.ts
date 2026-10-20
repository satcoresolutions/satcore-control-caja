import type { Account, Kind, Movement, Openings } from "./types";
import { ACCOUNTS, TRANSFER } from "./types";
import { addDays, diffDays, fmtMonthKey, fmtShort, startOfMonth, todayISO } from "./dates";

export type RangeId = "today" | "7d" | "30d" | "month" | "all" | "custom";

export interface Range {
  from: string;
  to: string;
}

export const isTransfer = (m: Movement): boolean => m.category === TRANSFER;

export const signed = (m: Movement): number => (m.kind === "in" ? 1 : -1) * (Number(m.amount) || 0);

export function resolveRange(id: RangeId, movs: Movement[], custom: Range): Range {
  const today = todayISO();
  switch (id) {
    case "today":
      return { from: today, to: today };
    case "7d":
      return { from: addDays(today, -6), to: today };
    case "30d":
      return { from: addDays(today, -29), to: today };
    case "month":
      return { from: startOfMonth(today), to: today };
    case "custom": {
      const a = custom.from || today;
      const b = custom.to || today;
      return a <= b ? { from: a, to: b } : { from: b, to: a };
    }
    default: {
      const dates = movs.map((m) => m.date).sort();
      const first = dates[0] ?? today;
      const last = dates[dates.length - 1] ?? today;
      return { from: first, to: last > today ? last : today };
    }
  }
}

export function inRange(movs: Movement[], range: Range): Movement[] {
  return movs.filter((m) => m.date >= range.from && m.date <= range.to);
}

export function openingTotal(o: Openings): number {
  return ACCOUNTS.reduce((acc, a) => acc + (Number(o[a]) || 0), 0);
}

/** Saldo de cada cuenta contando los movimientos con fecha <= upTo (o todos si upTo es null). */
export function accountBalances(movs: Movement[], openings: Openings, upTo: string | null): Record<Account, number> {
  const out: Record<Account, number> = { Efectivo: Number(openings.Efectivo) || 0, Banco: Number(openings.Banco) || 0 };
  for (const m of movs) {
    if (upTo !== null && m.date > upTo) continue;
    out[m.account] += signed(m);
  }
  return out;
}

export const totalOf = (b: Record<Account, number>): number => b.Efectivo + b.Banco;

export interface Summary {
  start: number;
  inflow: number;
  outflow: number;
  net: number;
  end: number;
  count: number;
  biggestOut: Movement | null;
}

export function summarize(all: Movement[], period: Movement[], range: Range, openings: Openings): Summary {
  const start = totalOf(accountBalances(all, openings, addDays(range.from, -1)));
  let inflow = 0;
  let outflow = 0;
  let delta = 0;
  let biggestOut: Movement | null = null;

  for (const m of period) {
    delta += signed(m);
    if (isTransfer(m)) continue; // mover plata entre cuentas no es ingreso ni gasto
    if (m.kind === "in") inflow += m.amount;
    else {
      outflow += m.amount;
      if (!biggestOut || m.amount > biggestOut.amount) biggestOut = m;
    }
  }

  return {
    start,
    inflow,
    outflow,
    net: inflow - outflow,
    end: start + delta,
    count: period.length,
    biggestOut,
  };
}

/** Saldo total al cierre de cada fecha con movimientos. */
export function closingByDate(all: Movement[], openings: Openings): Map<string, number> {
  const sorted = [...all].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  let bal = openingTotal(openings);
  const map = new Map<string, number>();
  for (const m of sorted) {
    bal += signed(m);
    map.set(m.date, bal);
  }
  return map;
}

export interface Bucket {
  key: string;
  label: string;
  inflow: number;
  outflow: number;
}

/** Entradas y salidas por día (rangos de hasta 62 días) o por mes (rangos más largos). */
export function buckets(period: Movement[], range: Range): { unit: "day" | "month"; items: Bucket[] } {
  const span = diffDays(range.from, range.to) + 1;
  const map = new Map<string, Bucket>();
  let unit: "day" | "month";

  if (span <= 62) {
    unit = "day";
    for (let i = 0; i < span; i++) {
      const key = addDays(range.from, i);
      map.set(key, { key, label: fmtShort(key), inflow: 0, outflow: 0 });
    }
  } else {
    unit = "month";
    let cursor = range.from.slice(0, 7);
    const last = range.to.slice(0, 7);
    while (cursor <= last) {
      map.set(cursor, { key: cursor, label: fmtMonthKey(cursor), inflow: 0, outflow: 0 });
      const [y, m] = cursor.split("-").map(Number);
      cursor = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, "0")}`;
    }
  }

  for (const m of period) {
    if (isTransfer(m)) continue;
    const b = map.get(unit === "day" ? m.date : m.date.slice(0, 7));
    if (!b) continue;
    if (m.kind === "in") b.inflow += m.amount;
    else b.outflow += m.amount;
  }
  return { unit, items: [...map.values()] };
}

export function byCategory(period: Movement[], kind: Kind): { category: string; total: number; count: number }[] {
  const map = new Map<string, { category: string; total: number; count: number }>();
  for (const m of period) {
    if (m.kind !== kind || isTransfer(m)) continue;
    const cur = map.get(m.category) ?? { category: m.category, total: 0, count: 0 };
    cur.total += m.amount;
    cur.count += 1;
    map.set(m.category, cur);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
}
