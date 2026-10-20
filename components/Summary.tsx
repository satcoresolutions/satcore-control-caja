"use client";

import { useMemo } from "react";
import type { Movement, Openings } from "@/lib/types";
import { fmtLong } from "@/lib/dates";
import { formatCOP } from "@/lib/format";
import { buckets, byCategory, summarize, type Range } from "@/lib/stats";

interface Props {
  all: Movement[];
  period: Movement[];
  range: Range;
  openings: Openings;
}

function HBars({
  rows,
  tone,
  total,
}: {
  rows: { label: string; value: number; hint: string }[];
  tone: "in" | "out";
  total: number;
}) {
  const max = Math.max(...rows.map((r) => r.value), 0);
  if (rows.length === 0) return <p className="muted">Sin movimientos en este periodo.</p>;
  return (
    <ul className="hbars">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="hrow">
            <span>{r.label}</span>
            <strong>{formatCOP(r.value)}</strong>
          </div>
          <div className="track">
            <div className={`fill fill-${tone}`} style={{ width: `${max > 0 ? (r.value / max) * 100 : 0}%` }} />
          </div>
          <div className="muted small">
            {r.hint} · {total > 0 ? ((r.value / total) * 100).toFixed(1).replace(".", ",") : "0"}%
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Summary({ all, period, range, openings }: Props) {
  const s = useMemo(() => summarize(all, period, range, openings), [all, period, range, openings]);
  const chart = useMemo(() => buckets(period, range), [period, range]);
  const incomes = useMemo(() => byCategory(period, "in"), [period]);
  const expenses = useMemo(() => byCategory(period, "out"), [period]);

  const maxBucket = Math.max(...chart.items.flatMap((b) => [b.inflow, b.outflow]), 0);
  const labelStep = Math.max(1, Math.ceil(chart.items.length / 8));
  const h = (v: number) => (maxBucket > 0 && v > 0 ? `${Math.max((v / maxBucket) * 100, 2)}%` : "0%");

  return (
    <div className="stack">
      <section className="kpis">
        <div className="kpi">
          <span>Saldo inicial</span>
          <strong>{formatCOP(s.start)}</strong>
          <small>al empezar el periodo</small>
        </div>
        <div className="kpi">
          <span>Entradas</span>
          <strong className="money-in">{formatCOP(s.inflow)}</strong>
          <small>sin contar traslados</small>
        </div>
        <div className="kpi">
          <span>Salidas</span>
          <strong className="money-out">{formatCOP(s.outflow)}</strong>
          <small>sin contar traslados</small>
        </div>
        <div className="kpi">
          <span>Saldo final</span>
          <strong>{formatCOP(s.end)}</strong>
          <small className={s.net >= 0 ? "up-text" : "down-text"}>
            {s.net >= 0 ? "▲" : "▼"} {formatCOP(Math.abs(s.net))} en el periodo
          </small>
        </div>
      </section>

      {s.biggestOut ? (
        <p className="hint" style={{ margin: 0 }}>
          Mayor salida del periodo: <strong>{s.biggestOut.concept}</strong> por {formatCOP(s.biggestOut.amount)} (
          {fmtLong(s.biggestOut.date)}).
        </p>
      ) : null}

      <section className="panel">
        <div className="panel-head wrap">
          <h2>Entradas y salidas {chart.unit === "day" ? "por día" : "por mes"}</h2>
          <div className="legend">
            <span><i className="dot dot-in" /> Entradas</span>
            <span><i className="dot dot-out" /> Salidas</span>
          </div>
        </div>
        {period.length === 0 ? (
          <p className="muted">No hay movimientos en este periodo.</p>
        ) : (
          <>
            <div className="chart" role="img" aria-label="Entradas y salidas">
              {chart.items.map((b) => (
                <div
                  className="bar-col pair"
                  key={b.key}
                  title={`${b.label}: entradas ${formatCOP(b.inflow)} · salidas ${formatCOP(b.outflow)}`}
                >
                  <div className="bar bar-in" style={{ height: h(b.inflow) }} />
                  <div className="bar bar-out" style={{ height: h(b.outflow) }} />
                </div>
              ))}
            </div>
            <div className="chart-labels">
              {chart.items.map((b, i) => (
                <span key={b.key}>
                  <em>{i % labelStep === 0 ? b.label : ""}</em>
                </span>
              ))}
            </div>
          </>
        )}
      </section>

      <div className="grid grid-2 stats-grid">
        <section className="panel">
          <h2>De dónde entra la plata</h2>
          <HBars
            tone="in"
            total={s.inflow}
            rows={incomes.map((c) => ({
              label: c.category,
              value: c.total,
              hint: `${c.count} ${c.count === 1 ? "movimiento" : "movimientos"}`,
            }))}
          />
        </section>
        <section className="panel">
          <h2>En qué se va la plata</h2>
          <HBars
            tone="out"
            total={s.outflow}
            rows={expenses.map((c) => ({
              label: c.category,
              value: c.total,
              hint: `${c.count} ${c.count === 1 ? "movimiento" : "movimientos"}`,
            }))}
          />
        </section>
      </div>
    </div>
  );
}
