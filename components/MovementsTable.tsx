"use client";

import type { Movement } from "@/lib/types";
import { fmtLong } from "@/lib/dates";
import { formatCOP } from "@/lib/format";
import { isTransfer, signed } from "@/lib/stats";

interface Props {
  movements: Movement[];
  closing: Map<string, number>; // saldo total al cierre de cada fecha
  onEdit: (m: Movement) => void;
  onDelete: (m: Movement) => void;
}

export default function MovementsTable({ movements, closing, onEdit, onDelete }: Props) {
  const sorted = [...movements].sort((a, b) =>
    a.date === b.date ? b.createdAt - a.createdAt : a.date < b.date ? 1 : -1
  );

  const groups: { date: string; items: Movement[]; net: number }[] = [];
  for (const m of sorted) {
    const last = groups[groups.length - 1];
    const delta = isTransfer(m) ? 0 : signed(m);
    if (last && last.date === m.date) {
      last.items.push(m);
      last.net += delta;
    } else {
      groups.push({ date: m.date, items: [m], net: delta });
    }
  }

  if (groups.length === 0) return <p className="muted">No hay movimientos con estos filtros.</p>;

  return (
    <div className="table-wrap">
      <table className="sales">
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Cuenta</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th />
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g.date}>
            <tr className="day-row">
              <td colSpan={2}>{fmtLong(g.date)}</td>
              <td colSpan={3} className="day-balance">
                Saldo al cierre: {formatCOP(closing.get(g.date) ?? 0)}
              </td>
            </tr>
            {g.items.map((m) => (
              <tr key={m.id}>
                <td className="left">
                  {m.concept}
                  <div className="muted small">{[m.category, m.note].filter(Boolean).join(" · ")}</div>
                </td>
                <td>{m.account}</td>
                <td className="money-in">{m.kind === "in" ? formatCOP(m.amount) : ""}</td>
                <td className="money-out">{m.kind === "out" ? formatCOP(m.amount) : ""}</td>
                <td className="row-actions">
                  {m.pairId ? null : (
                    <button type="button" className="link" onClick={() => onEdit(m)}>
                      Editar
                    </button>
                  )}
                  <button type="button" className="link danger" onClick={() => onDelete(m)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
