"use client";

import { useEffect, useMemo, useState } from "react";
import type { Account, Kind, Movement, Openings } from "@/lib/types";
import { ACCOUNTS, ADJUST, TRANSFER } from "@/lib/types";
import { addDays, todayISO } from "@/lib/dates";
import { formatCOP, uid } from "@/lib/format";
import {
  accountBalances,
  closingByDate,
  inRange,
  resolveRange,
  totalOf,
  type Range,
  type RangeId,
} from "@/lib/stats";
import { downloadCSV, movementsToCSV } from "@/lib/csv";
import { DEMO_OPENINGS, demoMovements } from "@/lib/demo";
import { ui } from "@/lib/ui";

import MovementForm, { type FormData } from "./MovementForm";
import MovementsTable from "./MovementsTable";
import Summary from "./Summary";
import Arqueo from "./Arqueo";

const KEY_MOVS = "caja:movimientos";
const KEY_OPEN = "caja:saldos-iniciales";
const ZERO: Openings = { Efectivo: 0, Banco: 0 };

const RANGES: { id: RangeId; label: string }[] = [
  { id: "today", label: "Hoy" },
  { id: "7d", label: "7 días" },
  { id: "30d", label: "30 días" },
  { id: "month", label: "Este mes" },
  { id: "all", label: "Todo" },
  { id: "custom", label: "Rango" },
];

const tabItems = [
  ["mov", "Movimientos"],
  ["resumen", "Resumen"],
  ["arqueo", "Arqueo"],
] as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento lleno o bloqueado: se ignora */
  }
}

export default function CajaApp() {
  const [movs, setMovs] = useState<Movement[] | null>(null);
  const [openings, setOpenings] = useState<Openings | null>(null);
  const [tab, setTab] = useState<"mov" | "resumen" | "arqueo">("mov");
  const [rangeId, setRangeId] = useState<RangeId>("30d");
  const [custom, setCustom] = useState<Range>({ from: "", to: "" });
  const [kindFilter, setKindFilter] = useState<"all" | Kind>("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Movement | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const today = todayISO();

    setCustom({ from: addDays(today, -29), to: today });
    setMovs(read<Movement[]>(KEY_MOVS, []));
    setOpenings(read<Openings>(KEY_OPEN, ZERO));
  }, []);

  useEffect(() => {
    if (movs !== null) write(KEY_MOVS, movs);
  }, [movs]);

  useEffect(() => {
    if (openings !== null) write(KEY_OPEN, openings);
  }, [openings]);

  useEffect(() => {
    if (!message) return;

    const t = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(t);
  }, [message]);

  const list = movs ?? [];
  const op = openings ?? ZERO;

  const range = useMemo(
    () => resolveRange(rangeId, list, custom),
    [rangeId, list, custom]
  );

  const period = useMemo(
    () => inRange(list, range),
    [list, range]
  );

  const closing = useMemo(
    () => closingByDate(list, op),
    [list, op]
  );

  const today = todayISO();

  const nowBalances = useMemo(
    () => accountBalances(list, op, today),
    [list, op, today]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return period.filter((m) => {
      if (kindFilter !== "all" && m.kind !== kindFilter) return false;
      if (!q) return true;

      return [m.concept, m.category, m.note, m.account].some((v) =>
        v.toLowerCase().includes(q)
      );
    });
  }, [period, kindFilter, query]);

  if (movs === null || openings === null) {
    return (
      <p className={ui.muted} role="status">
        Cargando…
      </p>
    );
  }

  const widenIfNeeded = (date: string) => {
    if (
      rangeId !== "all" &&
      rangeId !== "custom" &&
      (date < range.from || date > range.to)
    ) {
      setRangeId("all");
    }
  };

  const saveMovement = (data: FormData, id?: string) => {
    if (id) {
      setMovs((l) =>
        (l ?? []).map((m) =>
          m.id === id
            ? {
              ...m,
              kind: data.kind === "out" ? "out" : "in",
              date: data.date,
              concept: data.concept,
              category: data.category,
              amount: data.amount,
              account: data.account,
              note: data.note,
            }
            : m
        )
      );

      setEditing(null);
      setMessage("Movimiento actualizado.");
    } else if (data.kind === "transfer") {
      const pairId = uid();
      const from: Account = data.account;
      const to: Account = from === "Efectivo" ? "Banco" : "Efectivo";

      const base = {
        date: data.date,
        concept: data.concept,
        category: TRANSFER,
        amount: data.amount,
        note: data.note,
        pairId,
      };

      const now = Date.now();

      setMovs((l) => [
        { ...base, id: uid(), createdAt: now + 1, kind: "in", account: to },
        { ...base, id: uid(), createdAt: now, kind: "out", account: from },
        ...(l ?? []),
      ]);

      setMessage(`Traslado de ${from} a ${to} registrado.`);
    } else {
      setMovs((l) => [
        {
          id: uid(),
          createdAt: Date.now(),
          date: data.date,
          kind: data.kind === "out" ? "out" : "in",
          concept: data.concept,
          category: data.category,
          amount: data.amount,
          account: data.account,
          note: data.note,
        },
        ...(l ?? []),
      ]);

      setMessage(
        data.kind === "in" ? "Entrada registrada." : "Salida registrada."
      );
    }

    widenIfNeeded(data.date);
  };

  const removeMovement = (m: Movement) => {
    const what = m.pairId
      ? "este traslado (se borran sus dos movimientos)"
      : `"${m.concept}" por ${formatCOP(m.amount)}`;

    if (!window.confirm(`¿Borrar ${what}?`)) return;

    setMovs((l) =>
      (l ?? []).filter((x) =>
        m.pairId ? x.pairId !== m.pairId : x.id !== m.id
      )
    );

    if (editing?.id === m.id) setEditing(null);
  };

  const startEdit = (m: Movement) => {
    setEditing(m);
    setTab("mov");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const adjust = (diff: number) => {
    setMovs((l) => [
      {
        id: uid(),
        createdAt: Date.now(),
        date: todayISO(),
        kind: diff > 0 ? "in" : "out",
        concept: "Ajuste por arqueo",
        category: ADJUST,
        amount: Math.abs(diff),
        account: "Efectivo",
        note: "",
      },
      ...(l ?? []),
    ]);

    setMessage("Ajuste registrado. La caja ya cuadra.");
  };

  const exportCSV = () =>
    downloadCSV(
      `caja-${range.from}_a_${range.to}.csv`,
      movementsToCSV(visible)
    );

  const loadDemo = () => {
    setMovs(demoMovements());
    setOpenings(DEMO_OPENINGS);
  };

  const clearAll = () => {
    if (
      !window.confirm(
        "¿Borrar TODOS los movimientos y saldos iniciales? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    setMovs([]);
    setOpenings(ZERO);
    setEditing(null);
  };

  const total = totalOf(nowBalances);

  return (
    <>
      {/* Saldos actuales */}
      <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="grid gap-1 rounded-xl border border-primary/30 bg-primary/10 p-5">
          <span className="text-sm text-text-muted">Saldo total hoy</span>

          <strong className="text-2xl font-bold tabular-nums text-foreground">
            {formatCOP(total)}
          </strong>

          <small className="text-xs text-text-muted">
            Efectivo + Banco
          </small>
        </div>

        {ACCOUNTS.map((a) => (
          <div
            className="grid gap-1 rounded-xl border border-border bg-surface-secondary p-5"
            key={a}
          >
            <span className="text-sm text-text-muted">{a}</span>

            <strong
              className={`text-2xl font-bold tabular-nums ${nowBalances[a] < 0 ? "text-danger" : "text-foreground"
                }`}
            >
              {formatCOP(nowBalances[a])}
            </strong>

            <small
              className={`text-xs ${nowBalances[a] < 0 ? "text-danger" : "text-text-muted"
                }`}
            >
              {nowBalances[a] < 0
                ? "Saldo negativo: revisa los registros"
                : "saldo actual"}
            </small>
          </div>
        ))}
      </section>

      {/* Saldos iniciales */}
      <details className={`${ui.panel} mb-6`}>
        <summary className="cursor-pointer font-semibold text-foreground marker:text-text-primary">
          Saldos iniciales
        </summary>

        <div className={`${ui.grid2} mt-4`}>
          {ACCOUNTS.map((a) => (
            <label className={ui.label} key={a}>
              {a} al empezar a usar la app ($)

              <input
                type="number"
                value={op[a]}
                onChange={(e) =>
                  setOpenings((o) => ({
                    ...(o ?? ZERO),
                    [a]: Number(e.target.value) || 0,
                  }))
                }
                className={ui.input}
              />
            </label>
          ))}
        </div>

        <p className={ui.hint}>
          Es lo que tenías en cada cuenta antes del primer movimiento
          registrado.
        </p>
      </details>

      {/* Filtros de periodo */}
      {tab !== "arqueo" && (
        <section className="mb-4 grid gap-3">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Periodo"
          >
            {RANGES.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={rangeId === r.id}
                className={
                  rangeId === r.id
                    ? ui.segOn
                    : `${ui.btn} border-transparent`
                }
                onClick={() => setRangeId(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>

          {rangeId === "custom" && (
            <div className="flex flex-wrap items-center gap-2">
              <label className={ui.label}>
                Desde
                <input
                  type="date"
                  aria-label="Desde"
                  value={custom.from}
                  onChange={(e) =>
                    setCustom((c) => ({ ...c, from: e.target.value }))
                  }
                  className={ui.input}
                />
              </label>

              <span className="pt-5 text-text-muted">a</span>

              <label className={ui.label}>
                Hasta
                <input
                  type="date"
                  aria-label="Hasta"
                  value={custom.to}
                  onChange={(e) =>
                    setCustom((c) => ({ ...c, to: e.target.value }))
                  }
                  className={ui.input}
                />
              </label>
            </div>
          )}
        </section>
      )}

      {/* Navegación */}
      <div
        className="mb-5 grid grid-cols-3 border-b border-border"
        role="tablist"
        aria-label="Secciones de caja"
      >
        {tabItems.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`border-b-2 px-3 py-3 text-sm font-semibold transition-colors ${tab === id
                ? "border-primary text-text-primary"
                : "border-transparent text-text-muted hover:text-foreground"
              }`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Movimientos */}
      {tab === "mov" && (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.7fr)]">
          <aside className="grid min-w-0 gap-3 lg:sticky lg:top-4">
            <MovementForm
              key={editing?.id ?? "nuevo"}
              editing={editing}
              movements={list}
              onSave={saveMovement}
              onCancel={() => setEditing(null)}
            />

            {message && (
              <p className={ui.toast} role="status" aria-live="polite">
                {message}
              </p>
            )}
          </aside>

          <section className={`${ui.panel} min-w-0`}>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className={ui.title}>Movimientos</h2>

                <p className={ui.hint}>
                  {visible.length}{" "}
                  {visible.length === 1 ? "movimiento" : "movimientos"} en el
                  periodo
                </p>
              </div>

              <div className="grid w-full gap-2 sm:grid-cols-[auto_minmax(140px,1fr)_auto]">
                <select
                  className={`${ui.input} min-w-0`}
                  value={kindFilter}
                  onChange={(e) =>
                    setKindFilter(e.target.value as "all" | Kind)
                  }
                  aria-label="Tipo de movimiento"
                >
                  <option value="all">Todos</option>
                  <option value="in">Solo entradas</option>
                  <option value="out">Solo salidas</option>
                </select>

                <input
                  type="search"
                  className={`${ui.input} min-w-0`}
                  placeholder="Buscar concepto…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Buscar movimientos"
                />

                <button
                  type="button"
                  className={`${ui.btn} w-full sm:w-auto`}
                  onClick={exportCSV}
                  disabled={visible.length === 0}
                >
                  Exportar CSV
                </button>
              </div>
            </div>

            {list.length === 0 ? (
              <div className="grid justify-items-center gap-3 rounded-lg border border-dashed border-border px-4 py-10 text-center">
                <p className={ui.muted}>
                  Aún no has registrado movimientos. Usa el formulario o carga
                  datos de ejemplo para explorar la app.
                </p>

                <button
                  type="button"
                  className={ui.btnPrimary}
                  onClick={loadDemo}
                >
                  Cargar datos de ejemplo
                </button>
              </div>
            ) : (
              <MovementsTable
                movements={visible}
                closing={closing}
                onEdit={startEdit}
                onDelete={removeMovement}
              />
            )}

            {list.length > 0 && (
              <p className={`${ui.hint} mt-4 border-t border-border pt-3`}>
                Los datos se guardan solo en este navegador.{" "}
                <button
                  type="button"
                  className={ui.linkDanger}
                  onClick={clearAll}
                >
                  Borrar todo
                </button>
              </p>
            )}
          </section>
        </div>
      )}

      {/* Resumen */}
      {tab === "resumen" && (
        <Summary all={list} period={period} range={range} openings={op} />
      )}

      {/* Arqueo */}
      {tab === "arqueo" && (
        <div className="grid gap-3">
          <Arqueo expectedCash={nowBalances.Efectivo} onAdjust={adjust} />

          {message && (
            <p className={ui.toast} role="status" aria-live="polite">
              {message}
            </p>
          )}
        </div>
      )}
    </>
  );
}