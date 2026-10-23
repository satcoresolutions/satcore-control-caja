"use client";

import { useMemo, useRef, useState } from "react";
import type { Account, Movement } from "@/lib/types";
import { ACCOUNTS, CATEGORIES_IN, CATEGORIES_OUT } from "@/lib/types";
import { todayISO } from "@/lib/dates";
import { formatCOP } from "@/lib/format";
import { ui } from "@/lib/ui";

export type FormKind = "in" | "out" | "transfer";

export interface FormData {
  kind: FormKind;
  date: string;
  concept: string;
  category: string;
  amount: number;
  account: Account;
  note: string;
}

interface Props {
  editing: Movement | null;
  movements: Movement[];
  onSave: (data: FormData, id?: string) => void;
  onCancel: () => void;
}

const KINDS: { id: FormKind; label: string }[] = [
  { id: "in", label: "Entrada" },
  { id: "out", label: "Salida" },
  { id: "transfer", label: "Traslado" },
];

export default function MovementForm({
  editing,
  movements,
  onSave,
  onCancel,
}: Props) {
  const [kind, setKind] = useState<FormKind>(editing?.kind ?? "in");
  const [date, setDate] = useState(editing?.date ?? todayISO());
  const [concept, setConcept] = useState(editing?.concept ?? "");
  const [category, setCategory] = useState(
    editing?.category ?? CATEGORIES_IN[0]
  );
  const [amount, setAmount] = useState(editing?.amount ?? 0);
  const [account, setAccount] = useState<Account>(
    editing?.account ?? "Efectivo"
  );
  const [note, setNote] = useState(editing?.note ?? "");
  const [error, setError] = useState("");

  const conceptRef = useRef<HTMLInputElement>(null);

  const categories = kind === "in" ? CATEGORIES_IN : CATEGORIES_OUT;
  const other: Account = account === "Efectivo" ? "Banco" : "Efectivo";

  // Conserva el concepto más reciente para autocompletar y recuperar su categoría.
  const known = useMemo(() => {
    const map = new Map<string, Movement>();

    for (const m of [...movements].sort(
      (a, b) => b.createdAt - a.createdAt
    )) {
      if (m.pairId) continue;

      const key = `${m.kind}|${m.concept.trim().toLowerCase()}`;

      if (m.concept.trim() && !map.has(key)) {
        map.set(key, m);
      }
    }

    return map;
  }, [movements]);

  const knownForKind = [...known.values()]
    .filter((m) => m.kind === kind)
    .slice(0, 50);

  const changeKind = (next: FormKind) => {
    if (editing) return;

    setKind(next);

    if (next === "in") {
      setCategory(CATEGORIES_IN[0]);
    } else if (next === "out") {
      setCategory(CATEGORIES_OUT[0]);
    }
  };

  const onConceptChange = (value: string) => {
    setConcept(value);

    if (editing || kind === "transfer") return;

    const match = known.get(`${kind}|${value.trim().toLowerCase()}`);

    if (match) {
      setCategory(match.category);
      setAccount(match.account);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) return setError("Elige la fecha.");
    if (!(amount > 0)) return setError("El valor debe ser mayor que 0.");

    if (kind !== "transfer" && !concept.trim()) {
      return setError("Escribe el concepto del movimiento.");
    }

    setError("");

    onSave(
      {
        kind,
        date,
        concept: concept.trim() || "Traslado entre cuentas",
        category,
        amount,
        account,
        note: note.trim(),
      },
      editing?.id
    );

    if (!editing) {
      // Conserva fecha, tipo y cuenta para registrar varios movimientos seguidos.
      setConcept("");
      setAmount(0);
      setNote("");
      conceptRef.current?.focus();
    }
  };

  const amountStyles = {
    in: {
      container: "border-success/30 bg-success/10",
      label: "text-success",
      value: "text-success",
    },
    out: {
      container: "border-danger/30 bg-danger/10",
      label: "text-danger",
      value: "text-danger",
    },
    transfer: {
      container: "border-primary/30 bg-primary/10",
      label: "text-text-primary",
      value: "text-foreground",
    },
  }[kind];

  return (
    <form
      className={`${ui.panel} grid gap-5`}
      onSubmit={submit}
      noValidate
    >
      {/* Encabezado */}
      <div>
        <h2 className={ui.title}>
          {editing ? "Editar movimiento" : "Registrar movimiento"}
        </h2>

        <p className={`${ui.mutedSmall} mt-1`}>
          {editing
            ? "Modifica los datos del movimiento seleccionado."
            : "Registra una entrada, salida o traslado entre tus cuentas."}
        </p>
      </div>

      {/* Tipo de movimiento */}
      <div className="grid gap-2">
        <span className="text-sm font-medium text-foreground">
          Tipo de movimiento
        </span>

        <div
          className={ui.seg}
          role="group"
          aria-label="Tipo de movimiento"
        >
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              aria-pressed={kind === k.id}
              className={`min-w-0 rounded-md px-2 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${kind === k.id
                  ? ui.segOn
                  : "text-text-muted hover:bg-surface hover:text-foreground"
                }`}
              disabled={Boolean(editing) && kind !== k.id}
              onClick={() => changeKind(k.id)}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>

      {/* Campos */}
      <div className={ui.formStack}>
        <label className={ui.label}>
          Fecha

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={ui.input}
            required
          />
        </label>

        <label className={ui.label}>
          {kind === "transfer" ? "Detalle (opcional)" : "Concepto"}

          <input
            ref={conceptRef}
            list="conceptos-caja"
            placeholder={
              kind === "in"
                ? "Ej. Ventas del día"
                : kind === "out"
                  ? "Ej. Pago de arriendo"
                  : "Ej. Consignación"
            }
            value={concept}
            onChange={(e) => onConceptChange(e.target.value)}
            className={ui.input}
            autoFocus
          />

          <datalist id="conceptos-caja">
            {knownForKind.map((m) => (
              <option key={m.id} value={m.concept} />
            ))}
          </datalist>
        </label>

        {kind !== "transfer" && (
          <label className={ui.label}>
            Categoría

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={ui.input}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className={ui.grid2}>
          <label className={ui.label}>
            Valor ($)

            <input
              type="number"
              min={0}
              step="any"
              value={amount}
              onChange={(e) =>
                setAmount(Math.max(0, Number(e.target.value) || 0))
              }
              className={ui.input}
              required
            />
          </label>

          <label className={ui.label}>
            {kind === "transfer" ? "Sale de" : "Cuenta"}

            <select
              value={account}
              onChange={(e) => setAccount(e.target.value as Account)}
              className={ui.input}
            >
              {ACCOUNTS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </div>

        {kind === "transfer" && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-sm leading-relaxed text-text-muted">
              El dinero sale de{" "}
              <strong className="text-foreground">{account}</strong> y entra a{" "}
              <strong className="text-foreground">{other}</strong>.
            </p>

            <p className="mt-1 text-xs text-text-muted">
              Este traslado no cuenta como ingreso ni como gasto.
            </p>
          </div>
        )}

        <label className={ui.label}>
          Nota (opcional)

          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={ui.input}
            placeholder="Agrega información adicional"
          />
        </label>
      </div>

      {/* Total */}
      <div
        className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${amountStyles.container}`}
        aria-live="polite"
      >
        <div className="grid gap-1">
          <span className={`text-sm font-medium ${amountStyles.label}`}>
            {kind === "in"
              ? "Entra a caja"
              : kind === "out"
                ? "Sale de caja"
                : "Se traslada"}
          </span>

          <span className="text-xs text-text-muted">
            {kind === "in"
              ? "Entrada de dinero"
              : kind === "out"
                ? "Salida de dinero"
                : `${account} → ${other}`}
          </span>
        </div>

        <strong
          className={`text-right text-lg font-bold tabular-nums ${amountStyles.value}`}
        >
          {formatCOP(amount)}
        </strong>
      </div>

      {/* Validación */}
      {error && (
        <p className={ui.alert} role="alert">
          {error}
        </p>
      )}

      {/* Acciones */}
      <div className="grid gap-2">
        <button
          type="submit"
          className={`${ui.btnPrimary} w-full`}
        >
          {editing ? "Guardar cambios" : "Registrar movimiento"}
        </button>

        {editing && (
          <button
            type="button"
            className={`${ui.btn} w-full`}
            onClick={onCancel}
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}