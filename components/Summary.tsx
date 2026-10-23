"use client";

import { useMemo } from "react";
import type { Movement, Openings } from "@/lib/types";
import { fmtLong } from "@/lib/dates";
import { formatCOP } from "@/lib/format";
import { buckets, byCategory, summarize, type Range } from "@/lib/stats";
import { ui } from "@/lib/ui";

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

  if (rows.length === 0) {
    return (
      <p className={`${ui.muted} py-6 text-center`}>
        Sin movimientos en este periodo.
      </p>
    );
  }

  return (
    <ul className="grid gap-5">
      {rows.map((r) => {
        const percentage = total > 0 ? (r.value / total) * 100 : 0;
        const width = max > 0 ? (r.value / max) * 100 : 0;

        return (
          <li key={r.label} className="grid gap-2">
            <div className="flex items-start justify-between gap-3">
              <span className="min-w-0 break-words text-sm font-medium text-foreground">
                {r.label}
              </span>

              <strong className="shrink-0 text-right text-sm tabular-nums text-foreground">
                {formatCOP(r.value)}
              </strong>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-border"
              role="progressbar"
              aria-label={`${r.label}: ${percentage.toFixed(1)}% del total`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.min(100, Math.max(0, percentage))}
            >
              <div
                className={`h-full rounded-full transition-[width] duration-300 ${tone === "in" ? "bg-success" : "bg-danger"
                  }`}
                style={{ width: `${Math.min(100, Math.max(0, width))}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
              <span>{r.hint}</span>
              <span className="tabular-nums">
                {percentage.toFixed(1).replace(".", ",")}%
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function Summary({
  all,
  period,
  range,
  openings,
}: Props) {
  const s = useMemo(
    () => summarize(all, period, range, openings),
    [all, period, range, openings]
  );

  const chart = useMemo(() => buckets(period, range), [period, range]);

  const incomes = useMemo(() => byCategory(period, "in"), [period]);

  const expenses = useMemo(() => byCategory(period, "out"), [period]);

  const maxBucket = Math.max(
    ...chart.items.flatMap((b) => [b.inflow, b.outflow]),
    0
  );

  const labelStep = Math.max(1, Math.ceil(chart.items.length / 8));

  const height = (value: number) =>
    maxBucket > 0 && value > 0
      ? `${Math.max((value / maxBucket) * 100, 2)}%`
      : "0%";

  const kpis = [
    {
      label: "Saldo inicial",
      value: s.start,
      detail: "Al empezar el periodo",
      valueClass: "text-foreground",
    },
    {
      label: "Entradas",
      value: s.inflow,
      detail: "Sin contar traslados",
      valueClass: "text-success",
    },
    {
      label: "Salidas",
      value: s.outflow,
      detail: "Sin contar traslados",
      valueClass: "text-danger",
    },
  ];

  return (
    <div className="grid gap-5">
      {/* Indicadores principales */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="grid content-start gap-2 rounded-xl border border-border bg-surface-secondary p-4 sm:p-5"
          >
            <span className="text-sm text-text-muted">{kpi.label}</span>

            <strong
              className={`break-words text-xl font-bold tabular-nums sm:text-2xl ${kpi.valueClass}`}
            >
              {formatCOP(kpi.value)}
            </strong>

            <small className="text-xs text-text-muted">{kpi.detail}</small>
          </div>
        ))}

        <div className="grid content-start gap-2 rounded-xl border border-primary/30 bg-primary/10 p-4 sm:p-5">
          <span className="text-sm text-text-muted">Saldo final</span>

          <strong className="break-words text-xl font-bold tabular-nums text-foreground sm:text-2xl">
            {formatCOP(s.end)}
          </strong>

          <small
            className={`text-xs ${s.net >= 0 ? "text-success" : "text-danger"
              }`}
          >
            {s.net >= 0 ? "▲" : "▼"} {formatCOP(Math.abs(s.net))} en el
            periodo
          </small>
        </div>
      </section>

      {/* Mayor salida */}
      {s.biggestOut && (
        <div className="rounded-lg border border-danger/20 bg-danger/5 px-4 py-3">
          <p className="text-sm leading-relaxed text-text-muted">
            Mayor salida del periodo:{" "}
            <strong className="text-foreground">
              {s.biggestOut.concept}
            </strong>{" "}
            por{" "}
            <strong className="text-danger">
              {formatCOP(s.biggestOut.amount)}
            </strong>{" "}
            <span>({fmtLong(s.biggestOut.date)}).</span>
          </p>
        </div>
      )}

      {/* Gráfico de entradas y salidas */}
      <section className={ui.panel}>
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className={ui.title}>Entradas y salidas</h2>
            <p className={ui.hint}>
              Comparación de movimientos{" "}
              {chart.unit === "day" ? "por día" : "por mes"}.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-text-muted">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full bg-success"
              />
              Entradas
            </span>

            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full bg-danger"
              />
              Salidas
            </span>
          </div>
        </div>

        {period.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
            <p className={ui.muted}>
              No hay movimientos en este periodo.
            </p>
          </div>
        ) : (
          <div
            className="w-full overflow-x-auto pb-2"
            role="img"
            aria-label={`Gráfico de entradas y salidas ${chart.unit === "day" ? "por día" : "por mes"
              }`}
          >
            <div className="flex h-56 min-w-max items-stretch gap-2 border-b border-border px-2 sm:gap-3">
              {chart.items.map((b) => (
                <div
                  className="flex w-8 items-end justify-center gap-1 sm:w-10"
                  key={b.key}
                  title={`${b.label}: entradas ${formatCOP(
                    b.inflow
                  )} · salidas ${formatCOP(b.outflow)}`}
                >
                  <div
                    className="w-3 rounded-t-sm bg-success transition-[height] duration-300 sm:w-4"
                    style={{ height: height(b.inflow) }}
                  />

                  <div
                    className="w-3 rounded-t-sm bg-danger transition-[height] duration-300 sm:w-4"
                    style={{ height: height(b.outflow) }}
                  />
                </div>
              ))}
            </div>

            <div
              className="mt-2 flex min-w-max gap-2 px-2 sm:gap-3"
              aria-hidden="true"
            >
              {chart.items.map((b, i) => (
                <span
                  key={b.key}
                  className="w-8 shrink-0 text-center text-[10px] text-text-muted sm:w-10 sm:text-xs"
                >
                  {i % labelStep === 0 ? b.label : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Distribución por categorías */}
      <div className="grid gap-5 xl:grid-cols-2">
        <section className={ui.panel}>
          <div className="mb-5">
            <h2 className={ui.title}>De dónde entra el dinero</h2>
            <p className={ui.hint}>
              Distribución de las entradas por categoría.
            </p>
          </div>

          <HBars
            tone="in"
            total={s.inflow}
            rows={incomes.map((c) => ({
              label: c.category,
              value: c.total,
              hint: `${c.count} ${c.count === 1 ? "movimiento" : "movimientos"
                }`,
            }))}
          />
        </section>

        <section className={ui.panel}>
          <div className="mb-5">
            <h2 className={ui.title}>En qué se va el dinero</h2>
            <p className={ui.hint}>
              Distribución de las salidas por categoría.
            </p>
          </div>

          <HBars
            tone="out"
            total={s.outflow}
            rows={expenses.map((c) => ({
              label: c.category,
              value: c.total,
              hint: `${c.count} ${c.count === 1 ? "movimiento" : "movimientos"
                }`,
            }))}
          />
        </section>
      </div>
    </div>
  );
}