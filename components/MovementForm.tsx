"use client";

import { useMemo, useRef, useState } from "react";
import type { Account, Movement } from "@/lib/types";
import { ACCOUNTS, CATEGORIES_IN, CATEGORIES_OUT } from "@/lib/types";
import { todayISO } from "@/lib/dates";
import { formatCOP } from "@/lib/format";

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

export default function MovementForm({ editing, movements, onSave, onCancel }: Props) {
  const [kind, setKind] = useState<FormKind>(editing?.kind ?? "in");
  const [date, setDate] = useState(editing?.date ?? todayISO());
  const [concept, setConcept] = useState(editing?.concept ?? "");
  const [category, setCategory] = useState(editing?.category ?? CATEGORIES_IN[0]);
  const [amount, setAmount] = useState(editing?.amount ?? 0);
  const [account, setAccount] = useState<Account>(editing?.account ?? "Efectivo");
  const [note, setNote] = useState(editing?.note ?? "");
  const [error, setError] = useState("");
  const conceptRef = useRef<HTMLInputElement>(null);

  const categories = kind === "in" ? CATEGORIES_IN : CATEGORIES_OUT;
  const other: Account = account === "Efectivo" ? "Banco" : "Efectivo";

  // Conceptos usados antes (para autocompletar y recordar la categoría)
  const known = useMemo(() => {
    const map = new Map<string, Movement>();
    for (const m of [...movements].sort((a, b) => b.createdAt - a.createdAt)) {
      if (m.pairId) continue;
      const key = `${m.kind}|${m.concept.trim().toLowerCase()}`;
      if (m.concept.trim() && !map.has(key)) map.set(key, m);
    }
    return map;
  }, [movements]);

  const knownForKind = [...known.values()].filter((m) => m.kind === kind).slice(0, 50);

  const changeKind = (next: FormKind) => {
    if (editing) return;
    setKind(next);
    if (next === "in") setCategory(CATEGORIES_IN[0]);
    else if (next === "out") setCategory(CATEGORIES_OUT[0]);
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
    if (kind !== "transfer" && !concept.trim()) return setError("Escribe el concepto del movimiento.");
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
      // Se conservan fecha, tipo y cuenta para registrar varios movimientos seguidos
      setConcept("");
      setAmount(0);
      setNote("");
      conceptRef.current?.focus();
    }
  };

  return (
    <form className="panel" onSubmit={submit}>
      <h2>{editing ? "Editar movimiento" : "Registrar movimiento"}</h2>

      <div className={`seg kinds kind-${kind}`} role="tablist">
        {KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            role="tab"
            aria-selected={kind === k.id}
            className={kind === k.id ? "active" : ""}
            disabled={Boolean(editing) && kind !== k.id}
            onClick={() => changeKind(k.id)}
          >
            {k.label}
          </button>
        ))}
      </div>

      <div className="form-stack spaced">
        <label>
          Fecha
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label>
          {kind === "transfer" ? "Detalle (opcional)" : "Concepto"}
          <input
            ref={conceptRef}
            list="conceptos-caja"
            placeholder={
              kind === "in" ? "Ej. Ventas del día" : kind === "out" ? "Ej. Pago de arriendo" : "Ej. Consignación"
            }
            value={concept}
            onChange={(e) => onConceptChange(e.target.value)}
            autoFocus
          />
          <datalist id="conceptos-caja">
            {knownForKind.map((m) => (
              <option key={m.id} value={m.concept} />
            ))}
          </datalist>
        </label>

        {kind !== "transfer" ? (
          <label>
            Categoría
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <div className="grid grid-2">
          <label>
            Valor ($)
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
            />
          </label>
          <label>
            {kind === "transfer" ? "Sale de" : "Cuenta"}
            <select value={account} onChange={(e) => setAccount(e.target.value as Account)}>
              {ACCOUNTS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </div>

        {kind === "transfer" ? (
          <p className="hint" style={{ margin: 0 }}>
            Sale de <strong>{account}</strong> y entra a <strong>{other}</strong>. No cuenta como ingreso ni gasto.
          </p>
        ) : null}

        <label>
          Nota (opcional)
          <input value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
      </div>

      <div className={`total-box amount-${kind}`}>
        <span>{kind === "in" ? "Entra a caja" : kind === "out" ? "Sale de caja" : "Se traslada"}</span>
        <strong>{formatCOP(amount)}</strong>
      </div>

      {error ? <p className="alert">{error}</p> : null}

      <button type="submit" className="btn btn-primary btn-block">
        {editing ? "Guardar cambios" : "Registrar"}
      </button>
      {editing ? (
        <button type="button" className="btn btn-block" onClick={onCancel}>
          Cancelar edición
        </button>
      ) : null}
    </form>
  );
}
